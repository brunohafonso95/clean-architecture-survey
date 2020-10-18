export default interface IErrorDetails {
  realErrorMessage?: string;
  date: string;
  message: string;
  file?: string;
  functionName?: string;
  line?: number;
  column?: number;
  stackTrace?: string;
}
