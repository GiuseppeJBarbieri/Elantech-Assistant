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
      productNumber: Joi.string().required(),
    },
  },

  Post: {
    body: {
      id: Joi.number().optional(),
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

  Put: {
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
    },
  },

  Delete: {
    params: {
      id: Joi.number().required(),
    },
  },
};
