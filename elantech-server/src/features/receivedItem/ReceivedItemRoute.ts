import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ReceivedItemController from './ReceivedItemController';
import ReceivedItemValidation from './ReceivedItemValidation';

const router = express.Router();

/**
 * This route will add new ReceivedItem
 */
router.post('/', authenticationMiddleware, validate(ReceivedItemValidation.PostReceivedItem),
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
* This route will fetch all ReceivedItem.
*/
router.get('/', authenticationMiddleware, validate(ReceivedItemValidation.GetAllReceivedItem),
  (req, res, next) => {
    logger.info('GET ALL Received Item');

    ReceivedItemController.GetAll()
      .then((ReceivedItem) => res.status(200).json(ReceivedItem))
      .catch((err) => next(err));
  });

/**
* This route will fetch a ReceivedItem by id
*/
router.get('/:id', authenticationMiddleware, validate(ReceivedItemValidation.GetReceivedItem),
  (req, res, next) => {
    logger.info('GET Received Item');

    ReceivedItemController.Get(Number(req.params.id))
      .then((ReceivedItem) => res.status(200).json(ReceivedItem))
      .catch((err) => next(err));
  });

/**
* This route will fetch a ReceivedItem by receiving id
*/
router.get('/receiving/:id', authenticationMiddleware, validate(ReceivedItemValidation.GetReceivedItem),
  (req, res, next) => {
    logger.info('GET Received Item by Receiving Id');
    ReceivedItemController.GetByReceivingId(Number(req.params.id))
      .then((receivedItems) => res.status(200).json(receivedItems))
      .catch((err) => next(err));
  });

/**
* This route will update a ReceivedItem
*/
router.put('/', authenticationMiddleware, validate(ReceivedItemValidation.PutReceivedItem),
  (req, res, next) => {
    logger.info('PUT Received Item');

    ReceivedItemController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a ReceivedItem by id
*/
router.delete('/:id', authenticationMiddleware, validate(ReceivedItemValidation.DeleteReceivedItem),
  (req, res, next) => {
    logger.info('DELETE Received Item');

    ReceivedItemController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
