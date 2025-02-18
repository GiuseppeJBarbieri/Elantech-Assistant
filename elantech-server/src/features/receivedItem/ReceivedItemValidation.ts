import * as Joi from 'joi';

export default {
  GetAllReceivedItem: {
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
      receivingId: Joi.number().required(),
      productId: Joi.number().required(),
      cud: Joi.string().required(),
      comment: Joi.string(),
      finishedAdding: Joi.boolean().required(),
    },
  },

  PutReceivedItem: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      receivingId: Joi.number().required(),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      cud: Joi.string().required(),
      comment: Joi.string(),
      finishedAdding: Joi.boolean().required(),
      product: Joi.object().optional().allow(null, ''),

      // Interanal sequelize columns
      createdAt: Joi.string().optional(),
      updatedAt: Joi.string().optional(),
      deletedAt: Joi.string().optional().allow(null),
    },
  },
};
