import stackTraceParser from 'error-stack-parser';

import { ServerError } from '@presentation/errors';
import IErrorDetails from './interfaces/IErrorDetails';

export default (error: ServerError): IErrorDetails => {
  const [errorDetails] = stackTraceParser.parse(error);
  const {
    fileName: file,
    columnNumber: column,
    lineNumber: line,
    functionName,
  } = errorDetails;

  return {
    realErrorMessage: error.realErrorMessage,
    date: new Date().toISOString(),
    message: error.message,
    file,
    functionName: functionName || 'no function name',
    line,
    column,
    stackTrace: error.stack,
  };
};
