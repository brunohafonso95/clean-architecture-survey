import Joi from '@hapi/joi';

import joiAdapter from '../../../utils/JoiAdapter';

import IMongoConfig from '../../interfaces/IMongoConfig';

export const mongoConfigSchema = Joi.object({
  MONGO_URL: Joi.string().optional(),
  MONGODB_HOST: Joi.string().required(),
  MONGODB_USER: Joi.string().optional(),
  MONGODB_SSL: Joi.boolean().required(),
  MONGODB_PORT: Joi.number().required(),
  MONGODB_PASSWORD: Joi.string().optional(),
  MONGODB_DATABASE: Joi.string().required(),
});

export default (): IMongoConfig => {
  const {
    MONGO_URL,
    MONGODB_HOST,
    MONGODB_USER,
    MONGODB_SSL,
    MONGODB_PORT,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
  } = process.env;

  return joiAdapter.validateSchema<IMongoConfig>(mongoConfigSchema, {
    MONGO_URL,
    MONGODB_HOST,
    MONGODB_USER,
    MONGODB_SSL,
    MONGODB_PORT,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
  });
};
