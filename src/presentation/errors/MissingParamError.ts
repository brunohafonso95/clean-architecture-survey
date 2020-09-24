export default class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
