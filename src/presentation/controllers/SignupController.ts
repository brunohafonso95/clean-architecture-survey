import httpStatus from 'http-status-codes';

import IAccountModel from '@domain/interfaces/IAccountModel';
import AddAccount from '@domain/usecases/AddAccount';
import IEmailValidator from '@utils/interfaces/IEmailValidator';
import enableErrorLog from '@decorators/enableErrorLog';

import BaseController from '../abstracts/BaseController';
import { ServerError, InvalidParamError } from '../errors';
import IController from '../interfaces/IController';
import IHttpRequest from '../interfaces/IHttpRequest';

import IHttpResponse from '../interfaces/IHttpResponse';

@enableErrorLog
export default class SignupController
  extends BaseController
  implements IController {
  private requiredParams = [
    'name',
    'email',
    'password',
    'passwordConfirmation',
  ];

  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: AddAccount,
  ) {
    super();
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const missingParamsError = this.handleMissingParams(
        this.requiredParams,
        httpRequest,
      );

      if (missingParamsError) {
        return missingParamsError;
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (!this.emailValidator.isValid(email)) {
        return this.formatHttpErrorResponse(
          httpStatus.BAD_REQUEST,
          new InvalidParamError('email'),
        );
      }

      if (password !== passwordConfirmation) {
        return this.formatHttpErrorResponse(
          httpStatus.BAD_REQUEST,
          new InvalidParamError('passwordConfirmation'),
        );
      }

      const newAccount = await this.addAccount.execute({
        name,
        email,
        password,
      });

      return this.formatHttpSuccessResponse<IAccountModel>(
        httpStatus.CREATED,
        newAccount,
      );
    } catch (error) {
      return this.formatHttpErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        new ServerError(error.message),
      );
    }
  }
}
