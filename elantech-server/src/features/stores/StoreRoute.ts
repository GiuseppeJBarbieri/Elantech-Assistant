import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import StoreValidation from './StoreValidation';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import StoreController from './StoreController';

const router = express.Router();

//= ==============================================================================================//
//  ROUTES                                                                                       //
//= ==============================================================================================//

/**
 * This route will add a store.
 */
router.post('/', authenticationMiddleware, validate(StoreValidation.PostStore),
  (req, res, next) => {
    logger.info('POST Store');
    StoreController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will fetch a store by id
 */
router.get('/:id', authenticationMiddleware, validate(StoreValidation.GetStore), (req, res, next) => {
  logger.info('GET Store');

  StoreController.GetById(Number(req.params.id))
    .then((store) => res.status(200).json(store))
    .catch((err) => next(err));
});

/**
 * This route will fetch all stores
 */
router.get('/', authenticationMiddleware, validate(StoreValidation.GetAllStores), (req, res, next) => {
  logger.info('GET ALL Stores');

  StoreController.GetAll()
    .then((stores) => res.status(200).json(stores))
    .catch((err) => next(err));
});

/**
 * This route will delete store by id
 */
router.delete('/:storeId', authenticationMiddleware, validate(StoreValidation.RemoveStoreById), (req, res, next) => {
  logger.info('DELETE Store');

  StoreController.RemoveById(Number(req.params.storeId))
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => next(err));
});

export default router;
