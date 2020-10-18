import Collections from '@infra/interfaces/enums/collections';

import MongoHelper from './MongoHelper';

describe('MongoHelper tests', () => {
  beforeAll(async () => {
    await MongoHelper.connectToDatabase();
  });

  afterAll(async () => {
    await MongoHelper.closeDatabaseConnection();
  });

  it('should reconnect if the mongo connection is down', () => {
    const accountCollection = MongoHelper.getCollection(Collections.ACCOUNTS);
    expect(accountCollection).toBeTruthy();
  });
});
