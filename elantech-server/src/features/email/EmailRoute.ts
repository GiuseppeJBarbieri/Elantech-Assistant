import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import EmailValidation from './EmailValidation';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import EmailController from './EmailController';

const router = express.Router();

//= ==============================================================================================//
//  ROUTES                                                                                       //
//= ==============================================================================================//

/**
 * This route will email a store.
 */
router.post('/Store', authenticationMiddleware,
  validate(EmailValidation.EmailStore), (req, res, next) => {
    const { storeId, orderDate } = req.body;
    logger.info('EMAIL STORE', orderDate);
    EmailController.EmailStore(storeId, orderDate)
      .then((timeFrames) => res.status(200).json(timeFrames))
      .catch((err) => next(err));
  });

/**
 * This route will email all stores
 */
// router.get('/:driverId', authenticationMiddleware,
//   validate(EmailValidation.GetDriver), (req, res, next) => {
//     logger.info('GET Email');

//     EmailController.GetById(Number(req.params.driverId))
//       .then((driver) => res.status(200).json(driver))
//       .catch((err) => next(err));
//   });

export default router;
