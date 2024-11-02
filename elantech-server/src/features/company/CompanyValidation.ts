import * as Joi from 'joi';

export default {
  GetAllCompanies: {
    params: {

    },
    body: {

    },
  },

  GetCompany: {
    params: {
      id: Joi.number().required(),
    },
  },

  DeleteCompany: {
    params: {
      id: Joi.number().required(),
    },
  },

  PostCompany: {
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

  PutCompany: {
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
      createdAt: Joi.string().optional().allow(null, ''),
      updatedAt: Joi.string().optional().allow(null, ''),
      deletedAt: Joi.string().optional().allow(null, ''),
    },
  },
};
