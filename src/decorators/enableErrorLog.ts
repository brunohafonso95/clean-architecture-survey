import httpStatus from 'http-status-codes';

import IHttpResponse from '@presentation/interfaces/IHttpResponse';
import IHttpRequest from '@presentation/interfaces/IHttpRequest';
import getErrorInstanceDetails from '@utils/getErrorInstanceDetails';
import LogErrorMongoRepository from '@infra/db/mongodb/logErrorRepository/LogErrorMongoRepository';

export default function enableErrorLog<T extends { new (...args: any[]): any }>(
  constructor: T,
): any {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
    }

    public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const httpResponse = await super.handle(httpRequest);
      if (
        httpResponse.statusCode === httpStatus.INTERNAL_SERVER_ERROR &&
        httpResponse.body instanceof Error
      ) {
        await new LogErrorMongoRepository().create(
          getErrorInstanceDetails(httpResponse.body),
        );
      }

      return httpResponse;
    }
  };
}
