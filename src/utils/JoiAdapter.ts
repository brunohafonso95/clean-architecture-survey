import { Schema, ValidationError } from '@hapi/joi';

import ISchemaValidator from './interfaces/ISchemaValidator';

class JoiAdapter implements ISchemaValidator {
  public validateSchema<T = any>(schema: Schema, value: any): T {
    const result = schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (result.error) {
      throw new Error(this.getSchemaErrorValidation(result.error));
    }

    return result.value;
  }

  public getSchemaErrorValidation(validationErrors: ValidationError): string {
    const schemaErrorDetails = validationErrors.details
      .map(errorDetail => errorDetail.message)
      .join(' ');

    return `Please check the follow datails:\n\n ${schemaErrorDetails}`;
  }
}

export default new JoiAdapter();
