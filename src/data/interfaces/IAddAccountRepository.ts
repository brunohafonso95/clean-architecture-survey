import IAccountModel from '@domain/interfaces/IAccountModel';

export default interface IAddAccountRepository {
  create(accountData: Omit<IAccountModel, 'id'>): Promise<IAccountModel>;
}
