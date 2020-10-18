export default class ServerError extends Error {
  constructor(public readonly realErrorMessage?: string) {
    super('Internal Server Error');
    this.realErrorMessage = realErrorMessage;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
