import * as Joi from 'joi';

export default {
  EmailStore: {
    body: {
      storeId: Joi.number(),
      orderDate: Joi.date(),
    },
  },

};
