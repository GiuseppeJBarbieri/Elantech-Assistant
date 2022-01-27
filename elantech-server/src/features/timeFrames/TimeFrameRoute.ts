import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import TimeFrameValidation from './TimeFrameValidation';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import TimeFrameController from './TimeFrameController';

const router = express.Router();

//= ==============================================================================================//
//  ROUTES                                                                                       //
//= ==============================================================================================//

/**
 * This route will add a time frame.
 */
router.post('/', authenticationMiddleware, validate(TimeFrameValidation.PostTimeFrame),
  (req, res, next) => {
    logger.info('POST TimeFrame');
    TimeFrameController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will fetch all time frames
 */
router.get('/', authenticationMiddleware, validate(TimeFrameValidation.GetAllTimeFrames), (req, res, next) => {
  logger.info('GET ALL TimeFrames');

  TimeFrameController.GetAll()
    .then((stores) => res.status(200).json(stores))
    .catch((err) => next(err));
});

/**
 * This route will fetch a time frame by id
 */
router.get('/:orderId', authenticationMiddleware, validate(TimeFrameValidation.GetTimeFrame), (req, res, next) => {
  logger.info('GET TimeFrame');

  TimeFrameController.GetByTimeFrameId(Number(req.params.id))
    .then((store) => res.status(200).json(store))
    .catch((err) => next(err));
});

/**
 * This route will fetch all time frames based on driverId and orderDate
 */
// eslint-disable-next-line max-len
router.post('/ByOrderDate', authenticationMiddleware,
  validate(TimeFrameValidation.GetTimeFramesByOrderDate), (req, res, next) => {
    const { driverId, orderDate } = req.body;
    logger.info('GET ALL TIME FRAMES BY DATE & DRIVER ID', orderDate);
    TimeFrameController.GetByDateAndDriver(driverId, orderDate)
      .then((stores) => res.status(200).json(stores))
      .catch((err) => next(err));
  });

/**
 * This route will delete a time frame by id
 */
router.delete('/:orderId',
  authenticationMiddleware,
  validate(TimeFrameValidation.RemoveById), (req, res, next) => {
    logger.info('DELETE TimeFrame');

    TimeFrameController.RemoveById(Number(req.params.orderId))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

router.put('/', authenticationMiddleware, validate(TimeFrameValidation.PutTimeFrame),
  (req, res, next) => {
    logger.info('PUT TimeFrame');
    TimeFrameController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });
export default router;
