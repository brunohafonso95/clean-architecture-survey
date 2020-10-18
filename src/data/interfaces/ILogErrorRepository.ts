import IErrorDetails from '@utils/interfaces/IErrorDetails';

export default interface ILogErrorRepository {
  create(errorDetails: IErrorDetails): Promise<void>;
}
