import * as Joi from 'joi';

export default {
  GetAllQuotedProducts: {
    params: {

    },
    body: {

    },
  },

  GetQuotedProductByQuoteId: {
    params: {
      companyID: Joi.number().required(),
    },
  },

  GetQuotedProducts: {
    params: {
      id: Joi.number().required(),
    },
  },

  GetProductQuotesTable: {
    params: {
      productId: Joi.number().required(),
    },
  },

  DeleteQuotedProducts: {
    params: {
      id: Joi.number().required(),
    },
  },

  PostQuotedProducts: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      quoteId: Joi.number().required(),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      quotedPrice: Joi.number().required(),
      productCondition: Joi.string().required(),
      comment: Joi.string().optional().allow(null, ''),
    },
  },

  PutQuotedProducts: {
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
};
