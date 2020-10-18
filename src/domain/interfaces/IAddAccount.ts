import IAccountModel from './IAccountModel';
import IAddAccountModel from './IAddAccountModel';

export default interface IAddAccount {
  execute(payload: IAddAccountModel): Promise<IAccountModel>;
}
