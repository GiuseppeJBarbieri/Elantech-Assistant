import * as Joi from 'joi';

export default {
  PostTimeFrame: {
    body: {
      storeId: Joi.number(),
      driverId: Joi.number(),
      customerName: Joi.string(),
      town: Joi.string(),
      orderNumber: Joi.string(),
      timeFrame: Joi.string(),
      orderDate: Joi.string(),
    },
  },

  GetTimeFrame: {
    params: {
      orderId: Joi.number().required(),
    },
  },

  GetTimeFramesByOrderDate: {
    body: {
      driverId: Joi.number(),
      orderDate: Joi.string(),
    },
  },

  GetAllTimeFrames: {
    params: {

    },
    body: {

    },
  },

  RemoveById: {
    params: {
      orderId: Joi.number().required(),
    },
  },

  PutTimeFrame: {
    body: {
      orderId: Joi.number(),
      storeId: Joi.number(),
      driverId: Joi.number(),
      customerName: Joi.string(),
      town: Joi.string(),
      orderNumber: Joi.string(),
      timeFrame: Joi.string(),
      orderDate: Joi.string(),
    },
  },

};
