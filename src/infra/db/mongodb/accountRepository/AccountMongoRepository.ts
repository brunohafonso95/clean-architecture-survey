import IAccountModel from '@domain/interfaces/IAccountModel';
import IAddAccountModel from '@domain/interfaces/IAddAccountModel';
import IAddAccountRepository from '@data/interfaces/IAddAccountRepository';
import Collections from '@infra/interfaces/enums/collections';

import MongoHelper from '../helpers/MongoHelper';

export default class AccountMongoRepository implements IAddAccountRepository {
  async create(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection(Collections.ACCOUNTS);
    const result = await accountCollection?.insertOne(accountData);
    const [account] = result?.ops || [];
    return MongoHelper.mapDatabaseObjectToDomainObject<IAccountModel>(account);
  }
}
