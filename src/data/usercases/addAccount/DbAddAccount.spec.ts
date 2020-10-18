import IEncrypter from '@data/interfaces/IEncrypter';
import BcryptAdapter from '@infra/cryptography/BcryptAdapter';
import IAddAccountRepository from '@data/interfaces/IAddAccountRepository';
import AddAccountRepository from '@data/repositories/AddAccountRepository';

import DbAddAccount from './DbAddAccount';

jest.mock('@infra/cryptography/BcryptAdapter');
jest.mock('@data/repositories/AddAccountRepository');

interface sutProperties {
  sut: DbAddAccount;
  encrypterMocked: jest.Mocked<IEncrypter>;
  addAccountRepositoryMocked: jest.Mocked<IAddAccountRepository>;
}

const makeAddAccountRepositoryMocked = (): jest.Mocked<
  IAddAccountRepository
> => {
  const addAccountRepositoryMocked = new AddAccountRepository() as jest.Mocked<
    IAddAccountRepository
  >;
  addAccountRepositoryMocked.create.mockResolvedValue({
    id: 'valid_id',
    email: 'valid_email',
    name: 'valid_name',
    password: 'hashed_password',
  });

  return addAccountRepositoryMocked;
};

const makeEncrypterMocked = (): jest.Mocked<IEncrypter> => {
  const encrypterMocked = new BcryptAdapter() as jest.Mocked<IEncrypter>;
  encrypterMocked.encrypt.mockResolvedValue('hashed_password');
  return encrypterMocked;
};

const makeSut = (): sutProperties => {
  const encrypterMocked = makeEncrypterMocked();
  const addAccountRepositoryMocked = makeAddAccountRepositoryMocked();
  const sut = new DbAddAccount(encrypterMocked, addAccountRepositoryMocked);
  return {
    sut,
    encrypterMocked,
    addAccountRepositoryMocked,
  };
};
describe('DbAddAccount usecase', () => {
  it('should call the encrypter with correct password', async () => {
    const { sut, encrypterMocked } = makeSut();
    const encryptSpy = jest.spyOn(encrypterMocked, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.execute(accountData);
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });

  it('should throw if IEncrypter throws', async () => {
    const { sut, encrypterMocked } = makeSut();
    encrypterMocked.encrypt.mockRejectedValue(new Error());
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    const accountPromise = sut.execute(accountData);
    await expect(accountPromise).rejects.toThrow();
  });

  it('should call the AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryMocked } = makeSut();
    const addAccountRepositoryCreateSpy = jest.spyOn(
      addAccountRepositoryMocked,
      'create',
    );
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.execute(accountData);
    expect(addAccountRepositoryCreateSpy).toHaveBeenCalledWith({
      ...accountData,
      password: 'hashed_password',
    });
  });

  it('should throw if addAccountRepository throws', async () => {
    const { sut, addAccountRepositoryMocked } = makeSut();
    addAccountRepositoryMocked.create.mockRejectedValue(new Error());
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    const accountPromise = sut.execute(accountData);
    await expect(accountPromise).rejects.toThrow();
  });

  it('should return an account when success', async () => {
    const { sut } = makeSut();
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };

    const account = await sut.execute(accountData);
    expect(account).toEqual({
      ...accountData,
      id: 'valid_id',
      password: 'hashed_password',
    });
  });
});
