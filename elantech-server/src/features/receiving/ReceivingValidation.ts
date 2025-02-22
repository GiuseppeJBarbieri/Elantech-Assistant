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

  Delete: {
    params: {
      id: Joi.number().required(),
    },
  },

  Post: {
    body: {
      companyId: Joi.number().required(),
      purchaseOrderNumber: Joi.string().required(),
      orderType: Joi.string().required(),
      trackingNumber: Joi.string().required(),
      dateReceived: Joi.date(),
      shippedVia: Joi.string().required(),
      comment: Joi.string().optional().allow(null, ''),
      receivedItems: Joi.array().items(Joi.object().keys({
        id: Joi.number().optional().allow(null, ''),
        receivingId: Joi.number().required(),
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
        cud: Joi.string().required(),
        comment: Joi.string().optional().allow(null, ''),
        finishedAdding: Joi.boolean().required(),
        product: Joi.object().optional().allow(null, ''),
      })).required(),
    },
  },

  Put: {
    body: {
        id: Joi.number().required(),
        userId: Joi.number().optional().allow(null, ''),
        companyId: Joi.number().required(),
        purchaseOrderNumber: Joi.string().required(),
        orderType: Joi.string().required(),
        trackingNumber: Joi.string().required(),
        dateReceived: Joi.date(),
        shippedVia: Joi.string().required(),
        comment: Joi.string().optional().allow(null, ''),
        company: Joi.object().optional().allow(null, ''),
        user: Joi.object().optional().allow(null, ''),

        // Interanal sequelize columns
        createdAt: Joi.string().optional(),
        updatedAt: Joi.string().optional(),
        deletedAt: Joi.string().optional().allow(null),
    },
  },
};
