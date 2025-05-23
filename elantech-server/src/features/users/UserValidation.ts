import * as Joi from 'joi';
import constants from '../../utils/constants/Constants';

export default {
  PostUser: {
    body: {
      userTypeId: Joi.number().required(),
      email: Joi.string().lowercase().email().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      // password requirements
      // 8 characters
      // One Upper Case
      // One Lower Case
      // One Number
      // One Special character
      password: Joi.string().regex(constants.USER.PASSWORD.REGEX).required(),
      phoneNumber: Joi.string(),
    },
  },

  GetUser: {
    params: {
      id: Joi.number().required(),
    },
  },

  GetUserByEmail: {
    params: {
      email: Joi.string().required(),
    },
  },

  Login: {
    body: {
      username: Joi.string().lowercase().email().required(),
      password: Joi.string().required(),
    },
  },

  // Empty body and URL params list
  Logout: { params: {}, body: {} },
};
