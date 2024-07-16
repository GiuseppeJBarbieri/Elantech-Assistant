import * as Joi from 'joi';

export default {
  PostRemovedInventory: {
    params: {
      id: Joi.number().required(),
      userId: Joi.number().required(),
      reasonType: Joi.string().required(),
      reason: Joi.string().required(),
      dateRemoved: Joi.date().optional().allow(''),
    },
  },
};
