import * as Joi from 'joi';

export default {
  GetQuotedProducts: {
    params: {
      id: Joi.number().required(),
    },
  },

  DeleteQuotedProducts: {
    params: {
      id: Joi.number().required(),
    },
  },

  PostQuotedProducts: {
    body: {
      id: Joi.number().required(),
      quoteID: Joi.number().required(),
      productNumber: Joi.string().required(),
      orderID: Joi.number().required(),
      quantity: Joi.number().required(),
      quotedPrice: Joi.string().required(),
      productCondition: Joi.string().required(),
      comment: Joi.string().required(),
    },
  },

  PutQuotedProducts: {
    body: {
      id: Joi.number().required(),
      quoteID: Joi.number().required(),
      productNumber: Joi.string().required(),
      orderID: Joi.number().required(),
      quantity: Joi.number().required(),
      quotedPrice: Joi.string().required(),
      productCondition: Joi.string().required(),
      comment: Joi.string().required(),
    },
  },
};
