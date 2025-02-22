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

  GetQuotedProductByQuoteId: {
    params: {
      quoteId: Joi.number().required(),
    },
  },

  GetProductQuotesTable: {
    params: {
      productId: Joi.number().required(),
    },
  },

  Post: {
    body: {
      quoteId: Joi.number().required(),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      quotedPrice: Joi.number().required(),
      productCondition: Joi.string().required(),
      comment: Joi.string().optional().allow(null, ''),
    },
  },

  Put: {
    body: {
      id: Joi.number().required(),
      quoteId: Joi.number().required(),
      productId: Joi.number().required(),
      orderId: Joi.number().optional().allow(null),
      quantity: Joi.number().required(),
      quotedPrice: Joi.number().required(),
      productCondition: Joi.string().required(),
      comment: Joi.string().optional().allow(null),
    },
  },

  Delete: {
    params: {
      id: Joi.number().required(),
    },
  },
};
