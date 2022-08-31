import * as Joi from 'joi';

export default {
  GetInventory: {
    params: {
      productNumber: Joi.string().required(),
    },
  },

  DeleteInventory: {
    params: {
      serialNumber: Joi.string().required(),
    },
  },

  PostInventory: {
    body: {
      serialNumber: Joi.string().required(),
      productNumber: Joi.string().required(),
      removedId: Joi.number(),
      poNumber: Joi.string(),
      condition: Joi.string().required(),
      warrantyExpiration: Joi.date().required(),
      isTested: Joi.boolean().required(),
      dateTested: Joi.date(),
      comment: Joi.string(),
      location: Joi.string(),
    },
  },

  PutInventory: {
    body: {
      serialNumber: Joi.string(),
      productNumber: Joi.string(),
      removedId: Joi.number(),
      poNumber: Joi.string(),
      condition: Joi.string(),
      warrantyExpiration: Joi.date(),
      isTested: Joi.boolean(),
      dateTested: Joi.date(),
      comment: Joi.string(),
      location: Joi.string(),
    },
  },
};
