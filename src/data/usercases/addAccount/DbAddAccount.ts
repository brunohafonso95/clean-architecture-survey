import IAddAccountRepository from 'src/data/interfaces/IAddAccountRepository';
import IEncrypter from 'src/data/interfaces/IEncrypter';
import IAccountModel from 'src/domain/interfaces/IAccountModel';
import IAddAccount from 'src/domain/interfaces/IAddAccount';

export default class DbAddAccount implements IAddAccount {
  constructor(
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IAddAccountRepository,
  ) {}

  public async execute(
    accountData: Omit<IAccountModel, 'id'>,
  ): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const newAccount = await this.addAccountRepository.create({
      ...accountData,
      password: hashedPassword,
    });

    return newAccount;
  }
}
