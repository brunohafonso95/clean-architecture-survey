import httpStatus from 'http-status-codes';

import { MissingParamError } from '../errors';
import IHttpRequest from '../interfaces/IHttpRequest';
import IHttpResponse from '../interfaces/IHttpResponse';

export default abstract class BaseController {
  protected formatHttpErrorResponse(
    statusCode: number,
    error: Error,
  ): IHttpResponse {
    return {
      statusCode,
      body: error,
    };
  }

  protected formatHttpSuccessResponse<T = any>(
    statusCode: number,
    payload: T,
  ): IHttpResponse {
    return {
      statusCode,
      body: payload,
    };
  }

  protected handleMissingParams(
    params: string[],
    httpRequest: IHttpRequest,
  ): IHttpResponse | undefined {
    for (let i = 0; i < params.length; i += 1) {
      if (!httpRequest.body[params[i]]) {
        return this.formatHttpErrorResponse(
          httpStatus.BAD_REQUEST,
          new MissingParamError(params[i]),
        );
      }
    }
  }
}
