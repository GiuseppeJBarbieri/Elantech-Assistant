import * as express from 'express';
import passport from 'passport';
import validate from '../../middleware/JoiValidator';
import constants from '../../utils/constants/Constants';
import UserValidation from './UserValidation';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import UserController from './UserController';
import config from '../../config';

const router = express.Router();

const AUTH_PARAMS = config.auth;

//= ==============================================================================================//
//  ROUTES                                                                                       //
//= ==============================================================================================//

/**
 * This route will add a user.
 * IMPORTANT to create your first user remove the
 * authenticationMiddleware temporarily
 */
router.post('/', authenticationMiddleware, validate(UserValidation.PostUser),
  (req, res, next) => {
    logger.info('POST User');
    UserController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will fetch a user by id
 */
router.get('/byId/:id', authenticationMiddleware, validate(UserValidation.GetUser), (req, res, next) => {
  logger.info('GET User');

  UserController.GetById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err));
});

/**
 * This route will fetch a user id by email address
 */
router.get('/byEmail/:email', authenticationMiddleware, validate(UserValidation.GetUserByEmail), (req, res, next) => {
  logger.info('GET User');

  UserController.GetByEmail(req.params.email)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err));
});

/**
 * This route will attempt to login the user with the given credentials
 */
// eslint-disable-next-line max-len
router.post('/login', validate(UserValidation.Login), passport.authenticate('local'), (req, res) => {
  const response = constants.AUTH.PASSWORD_SUCCESS;

  // Note that 3600000 converts our cookieLife param from hours to milliseconds
  const cookieOptions = { maxAge: AUTH_PARAMS.cookieLife * 3600000 };
  res.cookie('sessionId', req.session['passport'].user.uuid, cookieOptions);
  return (res.status(200).json(response), req.session['passport'].user.uuid);
});

/**
 * This route will attempt to logout the user with the given session id and clear cookie
 */
router.get('/logout', authenticationMiddleware, validate(UserValidation.Logout),
  async (req, res) => {
    const response = constants.AUTH.LOGOUT_SUCCESS;
    await UserController.Logout(req.cookies.sessionId);
    res.status(200).json(response);
  });
export default router;
