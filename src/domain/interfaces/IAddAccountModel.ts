import IAccountModel from './IAccountModel';

export default interface IAddAccountModel extends Omit<IAccountModel, 'id'> {}
