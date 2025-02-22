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

  GetQuoteByCompanyId: {
    params: {
      companyId: Joi.number().required(),
    },
  },

  Post: {
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

  Put: {
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

  Delete: {
    params: {
      id: Joi.number().required(),
    },
  },
};
