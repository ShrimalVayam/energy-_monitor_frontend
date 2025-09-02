import Joi from 'joi';

export const deviceSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Device name is required',
    'string.min': 'Device name must be at least 2 characters',
    'string.max': 'Device name must be at most 100 characters',
  }),
  type: Joi.string().valid('sensor', 'appliance', 'meter').required().messages({
    'any.only': 'Please select a valid device type',
    'string.empty': 'Device type is required',
  }),
});
