import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format',
    }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});
