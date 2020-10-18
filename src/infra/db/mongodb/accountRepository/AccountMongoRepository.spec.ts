import Collections from '@infra/interfaces/enums/collections';

import MongoHelper from '../helpers/MongoHelper';
import AccountMongoRepository from './AccountMongoRepository';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

describe('MongoDB Account Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connectToDatabase(process.env.MONGO_URL as string);
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

  it('Should return an account on success', async () => {
    const sut = makeSut();
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };

    const result = await sut.create(account);
    expect(result).toEqual(
      expect.objectContaining({
        name: account.name,
        email: account.email,
        password: account.password,
      }),
    );
  });
});
