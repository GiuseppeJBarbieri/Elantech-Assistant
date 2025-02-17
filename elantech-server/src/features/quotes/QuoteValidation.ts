import * as Joi from 'joi';

export default {
  GetAllQuotes: {
    params: {

    },
    body: {

    },
  },

  GetQuoteByCompanyId: {
    params: {
      companyId: Joi.number().required(),
    },
  },

  GetQuote: {
    params: {
      id: Joi.number().required(),
    },
  },

  DeleteQuote: {
    params: {
      id: Joi.number().required(),
    },
  },

  PostQuote: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      companyId: Joi.number().required(),
      userId: Joi.number().required(),
      dateQuoted: Joi.date().required(),
      sold: Joi.boolean().required(),
      quotedProducts: Joi.array().items(Joi.object().keys({
        id: Joi.number().optional().allow(null, ''),
        quoteId: Joi.number().optional().allow(null, ''),
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
        quotedPrice: Joi.number().required(),
        productCondition: Joi.string().optional().allow(null, ''),
        comment: Joi.string().optional().allow(null, ''),
      })).required(),
    },
  },

  PutQuote: {
    body: {
      id: Joi.number().required(),
      companyId: Joi.number().required(),
      userId: Joi.number().required(),
      dateQuoted: Joi.date().required(),
      sold: Joi.boolean().required(),
    },
  },

  PutQuoteAndProducts: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      companyId: Joi.number().required(),
      userId: Joi.number().required(),
      dateQuoted: Joi.date().required(),
      sold: Joi.boolean().required(),
      quotedProducts: Joi.array().items(Joi.object().keys({
        id: Joi.number().optional().allow(null, ''),
        quoteId: Joi.number().optional().allow(null, ''),
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
        quotedPrice: Joi.number().required(),
        productCondition: Joi.string().optional().allow(null, ''),
        comment: Joi.string().optional().allow(null, ''),
      })).required(),
    },
  },
};
