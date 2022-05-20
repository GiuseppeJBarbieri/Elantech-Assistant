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

};
