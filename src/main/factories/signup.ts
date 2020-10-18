import EmailValidatorAdapter from '@utils/EmailValidator';
import SignupController from '@presentation/controllers/SignupController';
import DbAddAccount from '@data/usercases/addAccount/DbAddAccount';
import AccountMongoRepository from '@infra/db/mongodb/accountRepository/AccountMongoRepository';
import BcryptAdapter from '@infra/cryptography/BcryptAdapter';
import IController from '@presentation/interfaces/IController';

export default (): IController => {
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const emailValidatorAdapter = new EmailValidatorAdapter();
  return new SignupController(emailValidatorAdapter, dbAddAccount);
};
