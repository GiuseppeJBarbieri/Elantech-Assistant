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
      productId: Joi.number().required(),
      removedInventoryId: Joi.number().allow(null, ''),
      purchaseOrderId: Joi.number().optional().allow(null, ''),
      serialNumber: Joi.string().optional().allow(null, ''),
      condition: Joi.string().required(),
      warrantyExpiration: Joi.date(),
      tested: Joi.boolean().required(),
      testedDate: Joi.date().optional().allow(''),
      comment: Joi.string().optional().allow(null, ''),
      location: Joi.string().optional().allow(null, ''),
    },
  },

  PutInventory: {
    body: {
      id: Joi.number().required(),
      productId: Joi.number().required(),
      removedInventoryId: Joi.number().allow(null, ''),
      purchaseOrderId: Joi.number().optional().allow(null, ''),
      serialNumber: Joi.string().optional().allow(null, ''),
      condition: Joi.string().required(),
      warrantyExpiration: Joi.date(),
      tested: Joi.boolean().required(),
      testedDate: Joi.date().optional().allow(null, ''),
      comment: Joi.string().optional().allow(null, ''),
      location: Joi.string().optional().allow(null, ''),
      createdAt: Joi.string().optional(),
      updatedAt: Joi.string().optional(),
      deletedAt: Joi.string().optional().allow(null),
    },
  },
};
