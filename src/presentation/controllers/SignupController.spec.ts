import httpStatus from 'http-status-codes';

import EmailValidator from '@utils/EmailValidator';
import IEmailValidator from '@utils/interfaces/IEmailValidator';
import AddAccount from '@domain/usecases/AddAccount';
import IAddAccount from '@domain/interfaces/IAddAccount';
import LogErrorMongoRepository from '@infra/db/mongodb/logErrorRepository/LogErrorMongoRepository';
import getErrorInstanceDetails from '@utils/getErrorInstanceDetails';

import { InvalidParamError, MissingParamError, ServerError } from '../errors';
import SignupController from './SignupController';

jest.mock('@utils/EmailValidator');
jest.mock('@domain/usecases/AddAccount');

interface sutObject {
  emailValidatorMocked: jest.Mocked<IEmailValidator>;
  addAccountMocked: jest.Mocked<IAddAccount>;
  sut: SignupController;
}

const makeAddAccountMock = (): jest.Mocked<AddAccount> => {
  const addAccount = new AddAccount() as jest.Mocked<IAddAccount>;
  addAccount.execute.mockResolvedValue({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
  });

  return addAccount;
};

const makeEmailValidatorMock = (): jest.Mocked<IEmailValidator> => {
  const emailValidatorMocked = new EmailValidator() as jest.Mocked<
    IEmailValidator
  >;

  emailValidatorMocked.isValid.mockImplementation(() => true);

  return emailValidatorMocked;
};

const makeSut = (): sutObject => {
  const addAccountMocked = makeAddAccountMock();
  const emailValidatorMocked = makeEmailValidatorMock();
  const signupController = new SignupController(
    emailValidatorMocked,
    addAccountMocked,
  );

  return {
    sut: signupController,
    emailValidatorMocked,
    addAccountMocked,
  };
};

describe('SignupController tests', () => {
  it('should return 400 if no name if provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'mail@mail.com',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email if provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password if provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'mail@mail.com',
        passwordConfirmation: '12345678',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should return 400 if no password confirmation if provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'mail@mail.com',
        password: '12345678',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  it('should return 400 if no password confirmation and password does no match', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'mail@mail.com',
        password: '12345678',
        passwordConfirmation: 'invalid_password_confirmation',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation'),
    );
  });
  it('should return 400 if an invalid email if provided', async () => {
    const { sut, emailValidatorMocked } = makeSut();
    emailValidatorMocked.isValid.mockImplementationOnce(() => false);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorMocked } = makeSut();
    const emailValidatorMockedSpy = jest.spyOn(emailValidatorMocked, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
    };

    await sut.handle(httpRequest);
    expect(emailValidatorMockedSpy).toHaveBeenCalledWith(
      httpRequest.body.email,
    );
  });

  it('should return 500 if EmailValidator.isValid throws', async () => {
    const { sut, emailValidatorMocked } = makeSut();
    emailValidatorMocked.isValid.mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
    expect(httpResponse.body).toEqual(new ServerError(''));
  });

  it('should call addAccount with correct values', async () => {
    const { sut, addAccountMocked } = makeSut();
    const addAccountMockedSpy = jest.spyOn(addAccountMocked, 'execute');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
    };

    sut.handle(httpRequest);
    expect(addAccountMockedSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });
  });

  it('should return 500 if AddAccount.execute throws', async () => {
    const { sut, addAccountMocked } = makeSut();
    addAccountMocked.execute.mockRejectedValueOnce(new Error());

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
    expect(httpResponse.body).toEqual(new ServerError(''));
  });

  it('should insert a new error log on database when something wrong happens', async () => {
    const { sut, addAccountMocked } = makeSut();
    addAccountMocked.execute.mockRejectedValueOnce(new Error());
    const createLogSpy = jest
      .spyOn(LogErrorMongoRepository.prototype, 'create')
      .mockResolvedValueOnce();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
    };

    const response = await sut.handle(httpRequest);
    const { date, ...errorDetails } = getErrorInstanceDetails(response.body);
    expect(createLogSpy).toBeCalledWith(expect.objectContaining(errorDetails));
  });

  it('should return 201 with the created account', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(httpStatus.CREATED);
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    });
  });
});
