import * as Joi from 'joi';

export default {
  GetAllReceivedItems: {
    params: {

    },
    body: {

    },
  },

  GetReceivedItem: {
    params: {
      id: Joi.number().required(),
    },
  },

  DeleteReceivedItem: {
    params: {
      id: Joi.number().required(),
    },
  },

  PostReceivedItem: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      cud: Joi.string().required(),
    },
  },

  PutReceivedItem: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      cud: Joi.string().required(),
      createdAt: Joi.string().optional(),
      updatedAt: Joi.string().optional(),
      deletedAt: Joi.string().optional().allow(null),
    },
  },
};
