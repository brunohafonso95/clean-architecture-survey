export default interface ISchemaValidator {
  validateSchema(schema: any, value: any): any;
  getSchemaErrorValidation(validationErrors: any): string;
}
