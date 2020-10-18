import IAccountModel from '@domain/interfaces/IAccountModel';
import IAddAccountRepository from '@data/interfaces/IAddAccountRepository';

export default class AddAccountRepository implements IAddAccountRepository {
  public async create(
    accountData: Omit<IAccountModel, 'id'>,
  ): Promise<IAccountModel> {
    return Promise.resolve({ id: '', email: '', password: '', name: '' });
  }
}
