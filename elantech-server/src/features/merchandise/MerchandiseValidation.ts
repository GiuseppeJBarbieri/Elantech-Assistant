import * as Joi from 'joi';

export default {
  GetAllMerchandise: {
    params: {

    },
    body: {

    },
  },

  GetMerchandise: {
    params: {
      id: Joi.number().required(),
    },
  },

  DeleteMerchandise: {
    params: {
      id: Joi.number().required(),
    },
  },

  PostMerchandise: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      shippingId: Joi.number().required(),
      productId: Joi.number().required(),
      cud: Joi.string().required(),
      finishedAdding: Joi.boolean().required(),
    },
  },

  PutMerchandise: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      shippingId: Joi.number().required(),
      productId: Joi.number().required(),
      cud: Joi.string().required(),
      finishedAdding: Joi.boolean().required(),
      createdAt: Joi.string().optional(),
      updatedAt: Joi.string().optional(),
      deletedAt: Joi.string().optional().allow(null),
    },
  },
};
