import * as Joi from 'joi';

export default {
  GetAllReceiving: {
    params: {

    },
    body: {

    },
  },

  GetReceivedOrder: {
    params: {
      id: Joi.number().required(),
    },
  },

  DeleteReceivedOrder: {
    params: {
      id: Joi.number().required(),
    },
  },

  PostReceiving: {
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

  PutReceiving: {
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
