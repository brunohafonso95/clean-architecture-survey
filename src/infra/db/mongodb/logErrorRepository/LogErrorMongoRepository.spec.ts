import { Collection } from 'mongodb';

import Collections from '@infra/interfaces/enums/collections';
import IErrorDetails from '@utils/interfaces/IErrorDetails';
import ILogErrorRepository from '@data/interfaces/ILogErrorRepository';

import MongoHelper from '../helpers/MongoHelper';
import LogErrorMongoRepository from './LogErrorMongoRepository';

const makeSut = (): ILogErrorRepository => {
  return new LogErrorMongoRepository();
};

const fakeErrorDetails: IErrorDetails = {
  date: new Date().toISOString(),
  message: 'valid_message',
  column: 1,
  line: 1,
  file: 'valid_file',
  functionName: 'valid_function_name',
  stackTrace: 'valid_stack_trace',
};

describe('LogErrorMongoRepository Tests', () => {
  let errorCollection: Collection | undefined;

  beforeAll(async () => {
    await MongoHelper.connectToDatabase();
  });

  beforeEach(async () => {
    errorCollection = MongoHelper.getCollection(Collections.ERRORS);
    await errorCollection?.deleteMany({});
  });

  afterAll(async () => {
    await errorCollection?.deleteMany({});
    await MongoHelper.closeDatabaseConnection();
  });

  it('should create an error log on success', async () => {
    const sut = makeSut();
    await sut.create(fakeErrorDetails);
    const errorCounts = await errorCollection?.countDocuments();
    expect(errorCounts).toBe(1);
  });
});
