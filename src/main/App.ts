import '../utils/moduleAlias';
import express, { Application } from 'express';

import MongoHelper from '@infra/db/mongodb/helpers/MongoHelper';
import {
  bodyParser as bodyParserMiddleware,
  cors as corsMiddleware,
  contentType as contentTypeMiddleware,
} from './middlewares';
import * as routes from './routes';
import * as envVariableFactories from './config/env';

export default class App {
  private server: Application;

  constructor(private readonly port: number = 3333) {
    this.server = express();
  }

  public getServerInstance(): Application {
    return this.server;
  }

  public setupGlobalMiddlewares(): void {
    this.server.use(corsMiddleware);
    this.server.use(contentTypeMiddleware);
    this.server.use(bodyParserMiddleware());
  }

  public async initApplication(): Promise<void> {
    await this.connectToMongoDB();
    this.setupGlobalMiddlewares();
    this.setupRoutes();
  }

  public setupRoutes(): void {
    Object.values(routes).forEach(route => {
      this.server.use('/api/v1', route);
    });
  }

  public async connectToMongoDB(): Promise<void> {
    await MongoHelper.connectToDatabase();
  }

  public async closeConnectionToMongoDB(): Promise<void> {
    await MongoHelper.closeDatabaseConnection();
  }

  public validateEnvVariables(): void {
    Object.values(envVariableFactories).forEach(envVariableFactory =>
      envVariableFactory(),
    );
  }

  public async closeApplication(): Promise<void> {
    await this.closeConnectionToMongoDB();
  }

  public initServer(): void {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
