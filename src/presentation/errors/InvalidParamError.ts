export default class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
