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
      companyType: Joi.string().required(),
      companyName: Joi.string().required(),
      companyRep: Joi.string().required(),
      phoneNumber: Joi.string().optional().allow(null, ''),
      email: Joi.string().optional().allow(null, ''),
      location: Joi.string().optional().allow(null, ''),
      comments: Joi.string().optional().allow(null, ''),
    },
  },

  PutCompany: {
    body: {
      id: Joi.number().required(),
      companyType: Joi.string().required(),
      companyName: Joi.string().required(),
      companyRep: Joi.string().required(),
      phoneNumber: Joi.string().optional().allow(null, ''),
      email: Joi.string().optional().allow(null, ''),
      location: Joi.string().optional().allow(null, ''),
      comments: Joi.string().optional().allow(null, ''),
      createdAt: Joi.string().optional().allow(null, ''),
      updatedAt: Joi.string().optional().allow(null, ''),
      deletedAt: Joi.string().optional().allow(null, ''),
    },
  },
};
