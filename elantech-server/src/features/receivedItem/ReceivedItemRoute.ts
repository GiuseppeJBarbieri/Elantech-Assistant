import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ReceivedItemController from './ReceivedItemController';
import ReceivedItemValidation from './ReceivedItemValidation';

const router = express.Router();

/**
 * This route will add new quote
 */
router.post('/', authenticationMiddleware, validate(ReceivedItemValidation.PostReceivedItem),
  (req, res, next) => {
    logger.info('POST RECEIVING');
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
* This route will fetch all order.
*/
router.get('/', authenticationMiddleware, validate(ReceivedItemValidation.GetAllReceivedItems),
  (req, res, next) => {
    logger.info('GET ALL RECEIVING');

    ReceivedItemController.GetAll()
      .then((quotes) => res.status(200).json(quotes))
      .catch((err) => next(err));
  });

/**
* This route will fetch a order by id
*/
router.get('/:id', authenticationMiddleware, validate(ReceivedItemValidation.GetReceivedItem),
  (req, res, next) => {
    logger.info('GET RECEIVING');

    ReceivedItemController.Get(Number(req.params.id))
      .then((quote) => res.status(200).json(quote))
      .catch((err) => next(err));
  });

/**
* This route will update a order
*/
router.put('/', authenticationMiddleware, validate(ReceivedItemValidation.PutReceivedItem),
  (req, res, next) => {
    logger.info('PUT RECEIVING');

    ReceivedItemController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a order by id
*/
router.delete('/:id', authenticationMiddleware, validate(ReceivedItemValidation.DeleteReceivedItem),
  (req, res, next) => {
    logger.info('DELETE QUOTE');

    ReceivedItemController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
