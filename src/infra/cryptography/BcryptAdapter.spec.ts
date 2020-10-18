import bcrypt from 'bcrypt';

import IEncrypter from '@data/interfaces/IEncrypter';

import BcryptAdapter from './BcryptAdapter';

interface sutProperties {
  sut: IEncrypter;
}

const makeSut = (): sutProperties => {
  const sut = new BcryptAdapter();
  return { sut };
};

describe('BcryptAdpter', () => {
  it('should call encrypt with correct values', async () => {
    const { sut } = makeSut();
    const bcryptHashSpy = jest.spyOn(bcrypt, 'hash');
    const password = 'value';
    await sut.encrypt(password);
    expect(bcryptHashSpy).toHaveBeenCalledWith(password, 12);
  });

  it('should return a hash when the encrypt works', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashed_value');
    const password = 'value';
    const hashedValue = await sut.encrypt(password);
    expect(hashedValue).toBe('hashed_value');
  });

  it('should throw when bcrypt throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error());
    const password = 'value';
    const hashedValue = sut.encrypt(password);
    await expect(hashedValue).rejects.toThrow();
  });
});
