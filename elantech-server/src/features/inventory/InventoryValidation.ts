import * as Joi from 'joi';

export default {
  GetInventory: {
    params: {
      productId: Joi.number().required(),
    },
  },

  DeleteInventory: {
    params: {
      id: Joi.number().required(),
    },
  },

  PostInventory: {
    body: {
      id: Joi.number(),
      serialNumber: Joi.string(),
      productId: Joi.number().required(),
      removedId: Joi.number(),
      poNumber: Joi.string().optional(),
      condition: Joi.string().required(),
      warrantyExpiration: Joi.date(),
      isTested: Joi.boolean().required(),
      dateTested: Joi.date().required(),
      comment: Joi.string(),
      location: Joi.string(),
    },
  },

  PutInventory: {
    body: {
      id: Joi.number().required(),
      serialNumber: Joi.string(),
      productId: Joi.number().required(),
      removedId: Joi.number(),
      poNumber: Joi.string(),
      condition: Joi.string().required(),
      warrantyExpiration: Joi.date(),
      isTested: Joi.boolean().required(),
      dateTested: Joi.date().required(),
      comment: Joi.string(),
      location: Joi.string(),
    },
  },
};
