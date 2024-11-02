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
      id: Joi.number().optional().allow(null, ''),
      companyId: Joi.number().required(),
      userId: Joi.number().required(),
      purchaseOrderNumber: Joi.number().required(),
      orderType: Joi.string().required(),
      trackingNumber: Joi.string().required(),
      dateReceived: Joi.date(),
      shippedVia: Joi.string().required(),
      comment: Joi.string(),
    },
  },

  PutReceiving: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      companyId: Joi.number().required(),
      userId: Joi.number().required(),
      purchaseOrderNumber: Joi.number().required(),
      orderType: Joi.string().required(),
      trackingNumber: Joi.string().required(),
      dateReceived: Joi.date(),
      shippedVia: Joi.string().required(),
      comment: Joi.string(),
      createdAt: Joi.string().optional(),
      updatedAt: Joi.string().optional(),
      deletedAt: Joi.string().optional().allow(null),
    },
  },
};
