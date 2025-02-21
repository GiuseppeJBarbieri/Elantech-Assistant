import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ReceivedItemController from './ReceivedItemController';
import ReceivedItemValidation from './ReceivedItemValidation';
import BaseRoute from '../BaseRoute';

const router = BaseRoute(ReceivedItemController, ReceivedItemValidation);

// Override the POST route
router.stack = router.stack.filter((layer) => !(layer.route
  && layer.route.path === '/'
  && layer.route.methods.post
));

/**
 * This route will add new ReceivedItem
 */
router.post('/', authenticationMiddleware, validate(ReceivedItemValidation.Post),
  (req, res, next) => {
    logger.info('POST Received Item');
    const copy = JSON.parse(JSON.stringify(req.body));
    // eslint-disable-next-line dot-notation
    req.body.userId = req.session['userId'];
    ReceivedItemController.Add(copy)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will fetch a ReceivedItem by receiving id
*/
router.get('/receiving/:id', authenticationMiddleware, validate(ReceivedItemValidation.GetByOrderId),
  (req, res, next) => {
    logger.info('GET Received Item by Receiving Id');
    ReceivedItemController.GetByReceivingId(Number(req.params.id))
      .then((receivedItems) => res.status(200).json(receivedItems))
      .catch((err) => next(err));
  });

export default router;
