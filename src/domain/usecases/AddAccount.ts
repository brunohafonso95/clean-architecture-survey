import IAccountModel from '../interfaces/IAccountModel';
import IUseCase from '../interfaces/IUseCase';

interface IAddAccountModel extends Omit<IAccountModel, 'id'> {}

export default class AddAccount
  implements IUseCase<IAddAccountModel, IAccountModel> {
  public async execute(accountData: IAddAccountModel): Promise<IAccountModel> {
    return {
      id: '',
      name: '',
      email: '',
      password: '',
    };
  }
}
