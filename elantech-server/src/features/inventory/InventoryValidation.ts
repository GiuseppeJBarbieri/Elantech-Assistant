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
      serialNumber: Joi.string().optional().allow(null, ''),
      productId: Joi.number().required(),
      removedId: Joi.number().allow(null, ''),
      poId: Joi.number().optional().allow(null, ''),
      condition: Joi.string().required(),
      warrantyExpiration: Joi.date(),
      isTested: Joi.boolean().required(),
      dateTested: Joi.date().optional().allow(null, ''),
      comment: Joi.string().optional().allow(null, ''),
      location: Joi.string().optional().allow(null, ''),
    },
  },

  PutInventory: {
    body: {
      id: Joi.number().required(),
      serialNumber: Joi.string(),
      productId: Joi.number().required(),
      removedId: Joi.number().allow(null, ''),
      poId: Joi.number().optional().allow(null, ''),
      condition: Joi.string().required(),
      warrantyExpiration: Joi.date(),
      isTested: Joi.boolean().required(),
      dateTested: Joi.date().optional().allow(null, ''),
      comment: Joi.string().optional().allow(null, ''),
      location: Joi.string().optional().allow(null, ''),
      createdAt: Joi.string().optional(),
      updatedAt: Joi.string().optional(),
      deletedAt: Joi.string().optional().allow(null, ''),
    },
  },
};
