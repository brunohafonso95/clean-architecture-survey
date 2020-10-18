import httpStatus from 'http-status-codes';

import Collections from '@infra/interfaces/enums/collections';
import MongoHelper from '@infra/db/mongodb/helpers/MongoHelper';

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connectToDatabase();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection(Collections.ACCOUNTS);
    await accountCollection?.deleteMany({});
  });

  afterAll(async () => {
    const accountCollection = MongoHelper.getCollection(Collections.ACCOUNTS);
    await accountCollection?.deleteMany({});
    await MongoHelper.closeDatabaseConnection();
  });

  it('should return an account when success', async () => {
    await global.testRequest
      .post('/api/v1/signup')
      .send({
        name: 'Bruno Afonso',
        email: 'brunohafonso@gmail.com',
        password: '12345678',
        passwordConfirmation: '12345678',
      })
      .expect(httpStatus.CREATED);
  });
});
