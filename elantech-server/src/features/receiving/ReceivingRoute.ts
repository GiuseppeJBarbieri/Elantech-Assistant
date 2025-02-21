import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ReceivingController from './ReceivingController';
import ReceivingValidation from './ReceivingValidation';

const router = express.Router();

/**
 * This route will add new quote
 */
router.post('/', authenticationMiddleware, validate(ReceivingValidation.PostReceiving),
  (req, res, next) => {
    logger.info('POST RECEIVING');
    const copy = JSON.parse(JSON.stringify(req.body));
    copy.userId = req.session['userId'];
    ReceivingController.Add(copy)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will fetch all order.
*/
router.get('/', authenticationMiddleware, validate(ReceivingValidation.GetAllReceiving),
  (req, res, next) => {
    logger.info('GET ALL RECEIVING');

    ReceivingController.GetAll()
      .then((quotes) => res.status(200).json(quotes))
      .catch((err) => next(err));
  });

/**
* This route will fetch a order by id
*/
router.get('/:id', authenticationMiddleware, validate(ReceivingValidation.GetReceivedOrder),
  (req, res, next) => {
    logger.info('GET RECEIVING');

    ReceivingController.Get(Number(req.params.id))
      .then((quote) => res.status(200).json(quote))
      .catch((err) => next(err));
  });

/**
* This route will update a order
*/
router.put('/', authenticationMiddleware, validate(ReceivingValidation.PutReceiving),
  (req, res, next) => {
    logger.info('PUT RECEIVING');

    ReceivingController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a order by id
*/
router.delete('/:id', authenticationMiddleware, validate(ReceivingValidation.DeleteReceivedOrder),
  (req, res, next) => {
    logger.info('DELETE RECEIVING');

    ReceivingController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
