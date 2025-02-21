import * as Joi from 'joi';

export default {
  GetAll: {
    params: {

    },
    body: {

    },
  },

  Get: {
    params: {
      id: Joi.number().required(),
    },
  },

  GetByOrderId: {
    params: {
      id: Joi.number().required(),
    },
  },

  Delete: {
    params: {
      id: Joi.number().required(),
    },
  },

  Post: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      receivingId: Joi.number().required(),
      productId: Joi.number().required(),
      cud: Joi.string().required(),
      comment: Joi.string().optional().allow(null, ''),
      finishedAdding: Joi.boolean().required(),
    },
  },

  Put: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      receivingId: Joi.number().required(),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      cud: Joi.string().required(),
      comment: Joi.string().optional().allow(null, ''),
      finishedAdding: Joi.boolean().required(),
      product: Joi.object().optional().allow(null, ''),

      // Interanal sequelize columns
      createdAt: Joi.string().optional(),
      updatedAt: Joi.string().optional(),
      deletedAt: Joi.string().optional().allow(null),
    },
  },
};
