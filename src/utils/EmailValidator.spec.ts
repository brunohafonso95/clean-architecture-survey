import validator from 'validator';

import EmailValidator from './EmailValidator';

const makeSut = (): EmailValidator => {
  const emailValidator = new EmailValidator();
  return emailValidator;
};

jest.mock('validator', () => ({
  isEmail: () => true,
}));

describe('Email Validator', () => {
  it('should return false when the email provided is invalid', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const result = sut.isValid('invalid_email@mail.com');
    expect(result).toBeFalsy();
  });

  it('should class validator.isEmail method with correct email', () => {
    const sut = makeSut();
    const validatorIsEmailSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('valid_email@mail.com');
    expect(validatorIsEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('should return true when the email provided is valid', () => {
    const sut = makeSut();
    const result = sut.isValid('valid_email@mail.com');
    expect(result).toBeTruthy();
  });
});
