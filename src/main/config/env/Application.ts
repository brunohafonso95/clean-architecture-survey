import Joi from '@hapi/joi';

import joiAdapter from '@utils/JoiAdapter';

import IApplicationConfig from '../../interfaces/IAplicationConfig';

export const applicationConfigSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
});

export default (): IApplicationConfig => {
  const { NODE_ENV, PORT } = process.env;
  return joiAdapter.validateSchema<IApplicationConfig>(
    applicationConfigSchema,
    { NODE_ENV, PORT },
  );
};
