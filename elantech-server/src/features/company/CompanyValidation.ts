import * as Joi from 'joi';

export default {
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
      customerType: Joi.number().required(),
      companyName: Joi.string().required(),
      repName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      emailAddress: Joi.string().required(),
      location: Joi.string().required(),
      comment: Joi.string().required(),
    },
  },

  PutCompany: {
    body: {
      customerType: Joi.number().required(),
      companyName: Joi.string().required(),
      repName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      emailAddress: Joi.string().required(),
      location: Joi.string().required(),
      comment: Joi.string().required(),
    },
  },
};
