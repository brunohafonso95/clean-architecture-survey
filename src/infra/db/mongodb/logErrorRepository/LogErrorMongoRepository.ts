import ILogErrorRepository from '@data/interfaces/ILogErrorRepository';
import IErrorDetails from '@utils/interfaces/IErrorDetails';
import Collections from '@infra/interfaces/enums/collections';

import MongoHelper from '../helpers/MongoHelper';

export default class LogErrorMongoRepository implements ILogErrorRepository {
  async create(erroDetails: IErrorDetails): Promise<void> {
    const errorColletion = MongoHelper.getCollection(Collections.ERRORS);
    await errorColletion?.insertOne(erroDetails);
  }
}
