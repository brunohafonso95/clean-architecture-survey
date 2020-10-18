import IAccountModel from '../interfaces/IAccountModel';
import IAddAccount from '../interfaces/IAddAccount';
import IAddAccountModel from '../interfaces/IAddAccountModel';

export default class AddAccount implements IAddAccount {
  public async execute(accountData: IAddAccountModel): Promise<IAccountModel> {
    return {
      id: '',
      name: '',
      email: '',
      password: '',
    };
  }
}
