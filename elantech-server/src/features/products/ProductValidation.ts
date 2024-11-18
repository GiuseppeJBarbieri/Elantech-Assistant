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
      id: Joi.number().required(),
    },
  },

  PostProduct: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      userId: Joi.number().required(),
      productNumber: Joi.string().required(),
      altNumber1: Joi.string().optional().allow(null, ''),
      altNumber2: Joi.string().optional().allow(null, ''),
      altNumber3: Joi.string().optional().allow(null, ''),
      altNumber4: Joi.string().optional().allow(null, ''),
      altNumber5: Joi.string().optional().allow(null, ''),
      altNumber6: Joi.string().optional().allow(null, ''),
      quantity: Joi.number().required(),
      productType: Joi.string().required(),
      brand: Joi.string().required(),
      description: Joi.string().optional().allow(null, ''),
      ebayUrl: Joi.string().optional().allow(null, ''),
      websiteUrl: Joi.string().optional().allow(null, ''),
      quickSpecsUrl: Joi.string().optional().allow(null, ''),
      relatedTags: Joi.string().optional().allow(null, ''),
      reasonForRemoval: Joi.string().optional().allow(null, ''),
    },
  },

  PutProduct: {
    body: {
      id: Joi.number().required(),
      productNumber: Joi.string().required(),
      userId: Joi.number().required(),
      altNumber1: Joi.string().optional().allow(null, ''),
      altNumber2: Joi.string().optional().allow(null, ''),
      altNumber3: Joi.string().optional().allow(null, ''),
      altNumber4: Joi.string().optional().allow(null, ''),
      altNumber5: Joi.string().optional().allow(null, ''),
      altNumber6: Joi.string().optional().allow(null, ''),
      quantity: Joi.number().required(),
      productType: Joi.string().required(),
      brand: Joi.string().required(),
      description: Joi.string().optional().allow(null, ''),
      ebayUrl: Joi.string().optional().allow(null, ''),
      websiteUrl: Joi.string().optional().allow(null, ''),
      quickSpecsUrl: Joi.string().optional().allow(null, ''),
      relatedTags: Joi.string().optional().allow(null, ''),
      reasonForRemoval: Joi.string().optional().allow(null, ''),
      createdAt: Joi.string().optional(),
      updatedAt: Joi.string().optional(),
      deletedAt: Joi.string().optional().allow(null),
    },
  },
};
