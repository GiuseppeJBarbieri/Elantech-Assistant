import * as Joi from 'joi';

export default {
  GetAllProducts: {
    params: {

    },
    body: {

    },
  },

  GetProduct: {
    params: {
      productNumber: Joi.string().required(),
    },
  },

  DeleteProduct: {
    params: {
      productNumber: Joi.string().required(),
    },
  },

  PostProduct: {
    body: {
      productNumber: Joi.string().required(),
      userId: Joi.number().required(),
      altNumber1: Joi.string().optional().allow(''),
      altNumber2: Joi.string().optional().allow(''),
      altNumber3: Joi.string().optional().allow(''),
      altNumber4: Joi.string().optional().allow(''),
      altNumber5: Joi.string().optional().allow(''),
      altNumber6: Joi.string().optional().allow(''),
      quantity: Joi.number().required(),
      productType: Joi.string().required(),
      brand: Joi.string().required(),
      description: Joi.string().optional().allow(''),
      ebayLink: Joi.string().optional().allow(''),
      websiteLink: Joi.string().optional().allow(''),
      quickSpecsLink: Joi.string().optional().allow(''),
      relatedTags: Joi.string().optional().allow(''),
    },
  },

  PutProduct: {
    body: {
      productNumber: Joi.string(),
      userId: Joi.number(),
      altNumber1: Joi.string(),
      altNumber2: Joi.string(),
      altNumber3: Joi.string(),
      altNumber4: Joi.string(),
      altNumber5: Joi.string(),
      altNumber6: Joi.string(),
      quantity: Joi.number(),
      productType: Joi.string(),
      brand: Joi.string(),
      description: Joi.string(),
      ebayLink: Joi.string(),
      websiteLink: Joi.string(),
      quickSpecsLink: Joi.string(),
      relatedTags: Joi.string(),
    },
  },
};
