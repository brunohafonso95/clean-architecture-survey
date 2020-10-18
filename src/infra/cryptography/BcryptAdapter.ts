import bcrypt from 'bcrypt';

import IEncrypter from '@data/interfaces/IEncrypter';

export default class BcryptAdapter implements IEncrypter {
  public async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, 12);
  }
}
