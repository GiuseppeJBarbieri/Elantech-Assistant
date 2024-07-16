import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import MerchandiseController from './MerchandiseController';
import MerchandiseValidation from './MerchandiseValidation';

const router = express.Router();

/**
 * This route will add new merchandise
 */
router.post('/', authenticationMiddleware, validate(MerchandiseValidation.PostMerchandise),
  (req, res, next) => {
    logger.info('POST MERCHANDISE');
    const copy = JSON.parse(JSON.stringify(req.body));
    // eslint-disable-next-line dot-notation
    req.body.userId = req.session['userId'];
    MerchandiseController.Add(copy)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will fetch all merchandise.
*/
router.get('/', authenticationMiddleware, validate(MerchandiseValidation.GetAllMerchandise),
  (req, res, next) => {
    logger.info('GET ALL MERCHANDISE');

    MerchandiseController.GetAll()
      .then((merchandise) => res.status(200).json(merchandise))
      .catch((err) => next(err));
  });

/**
* This route will fetch a merchandise by id
*/
router.get('/:id', authenticationMiddleware, validate(MerchandiseValidation.GetMerchandise),
  (req, res, next) => {
    logger.info('GET MERCHANDISE');

    MerchandiseController.Get(Number(req.params.id))
      .then((merchandise) => res.status(200).json(merchandise))
      .catch((err) => next(err));
  });

/**
* This route will update a merchandise
*/
router.put('/', authenticationMiddleware, validate(MerchandiseValidation.PutMerchandise),
  (req, res, next) => {
    logger.info('PUT MERCHANDISE');

    MerchandiseController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a merchandise by id
*/
router.delete('/:id', authenticationMiddleware, validate(MerchandiseValidation.DeleteMerchandise),
  (req, res, next) => {
    logger.info('DELETE MERCHANDISE');

    MerchandiseController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
