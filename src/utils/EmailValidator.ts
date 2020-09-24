import validator from 'validator';

import IEmailValidator from './interfaces/IEmailValidator';

export default class EmailValidator implements IEmailValidator {
  public isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
