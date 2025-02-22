import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ReceivingController from './ReceivingController';
import ReceivingValidation from './ReceivingValidation';
import BaseRoute from '../BaseRoute';

const TAG: string = 'RECEIVING';

const router = BaseRoute(ReceivingController, ReceivingValidation, TAG);

// Override the POST route
router.stack = router.stack.filter((layer) => !(layer.route
  && layer.route.path === '/'
  && layer.route.methods.post
));

/**
 * This route will add new quote
 */
router.post('/', authenticationMiddleware, validate(ReceivingValidation.Post),
  (req, res, next) => {
    logger.info(`POST ${TAG}`);
    const copy = JSON.parse(JSON.stringify(req.body));
    copy.userId = req.session['userId'];
    ReceivingController.Add(copy)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
