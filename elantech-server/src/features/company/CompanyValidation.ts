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

  Post: {
    body: {
      id: Joi.number().optional().allow(null, ''),
      userId: Joi.number().required(),
      type: Joi.string().required(),
      name: Joi.string().required(),
      representative: Joi.string().required(),
      phone: Joi.string().optional().allow(null, ''),
      email: Joi.string().optional().allow(null, ''),
      location: Joi.string().optional().allow(null, ''),
      comment: Joi.string().optional().allow(null, ''),
    },
  },

  Put: {
    body: {
      id: Joi.number().required(),
      userId: Joi.number().required(),
      type: Joi.string(),
      name: Joi.string().required(),
      representative: Joi.string().required(),
      phone: Joi.string().optional().allow(null, ''),
      email: Joi.string().optional().allow(null, ''),
      location: Joi.string().optional().allow(null, ''),
      comment: Joi.string().optional().allow(null, ''),
    },
  },

  Delete: {
    params: {
      id: Joi.number().required(),
    },
  },
};
