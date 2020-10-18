export default interface IMongoConfig {
  /** host do MongoDb used for tests */
  MONGO_URL: string;
  /** host do MongoDb */
  MONGODB_HOST: string;
  /** usuário do MongoDB */
  MONGODB_USER?: string;
  /** flag que ativa/desativa o SSL do MongoDB */
  MONGODB_SSL: boolean;
  /** porta em que irá rodar o MongoDb */
  MONGODB_PORT: number;
  /** senha do MongoDB */
  MONGODB_PASSWORD?: string;
  /** nome do banco de dados */
  MONGODB_DATABASE: string;
}
