import * as Joi from 'joi';

export default {
  PostStore: {
    body: {
      storeName: Joi.string(),
      emailAddress: Joi.string(),
    },
  },

  GetStore: {
    params: {
      storeId: Joi.number().required(),
    },
  },

  GetAllStores: {
    params: {

    },
    body: {

    },
  },

  RemoveStoreById: {
    params: {
      storeId: Joi.number().required(),
    },
  },

};
