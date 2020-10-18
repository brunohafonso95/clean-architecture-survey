import { Collection, MongoClient } from 'mongodb';

import Collections from '@infra/interfaces/enums/collections';

import { getMongoDBEnv } from '@main/config/env';

class MongoHelper {
  private client: MongoClient | null = null;

  public async connectToDatabase(connectionString?: string): Promise<void> {
    if (connectionString) {
      this.client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      return;
    }

    this.client = await MongoClient.connect(this.getConnectionString(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async closeDatabaseConnection(): Promise<void> {
    await this.client?.close();
  }

  public getCollection(collectionName: Collections): Collection | undefined {
    return this.client?.db().collection(collectionName);
  }

  public mapDatabaseObjectToDomainObject<R = any>(databaseDataObject: any): R {
    const { _id: id, ...databaseDataObjectWithoutId } = databaseDataObject;
    return {
      id,
      ...databaseDataObjectWithoutId,
    };
  }

  private getConnectionString(): string {
    const {
      MONGO_URL,
      MONGODB_USER,
      MONGODB_HOST,
      MONGODB_PORT,
      MONGODB_DATABASE,
      MONGODB_PASSWORD,
      MONGODB_SSL,
    } = getMongoDBEnv();

    if (MONGO_URL) {
      return MONGO_URL;
    }

    return `mongodb://${
      MONGODB_USER && MONGODB_PASSWORD
        ? `${MONGODB_USER}:${encodeURIComponent(MONGODB_PASSWORD)}@`
        : ''
    }${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?ssl=${MONGODB_SSL}`;
  }
}

export default new MongoHelper();
