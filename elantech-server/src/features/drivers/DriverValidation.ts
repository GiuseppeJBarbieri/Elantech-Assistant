import * as Joi from 'joi';

export default {
  PostDriver: {
    body: {
      name: Joi.string(),
    },
  },

  GetDriver: {
    params: {
      driverId: Joi.number().required(),
    },
  },

  GetAllDrivers: {
    params: {

    },
    body: {

    },
  },

  RemoveDriverById: {
    params: {
      driverId: Joi.number().required(),
    },
  },

};
