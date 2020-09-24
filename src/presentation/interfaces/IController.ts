import IHttpRequest from './IHttpRequest';
import IHttpResponse from './IHttpResponse';

export default interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
