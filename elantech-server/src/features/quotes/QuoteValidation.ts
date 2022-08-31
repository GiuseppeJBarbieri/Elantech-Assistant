import * as Joi from 'joi';

export default {
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
      companyID: Joi.number().required(),
      userID: Joi.number().required(),
      dateQuoted: Joi.date().required(),
    },
  },

  PutQuote: {
    body: {
      companyID: Joi.number().required(),
      userID: Joi.number().required(),
      dateQuoted: Joi.date().required(),
    },
  },
};
