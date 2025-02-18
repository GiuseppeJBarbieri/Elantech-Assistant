import * as express from 'express';
import validate from '../middleware/JoiValidator';
import logger from '../utils/logging/Logger';
import authenticationMiddleware from '../middleware/Auth';

/*
* This is a base route which will be extended by other routes
* @param controller
* @param validation
*/
const BaseRoute = (controller: any, validation: any) => {
  const router = express.Router();

  /**
   * This route will add new record
   */
  router.post('/', authenticationMiddleware, validate(validation.Post), async (req, res, next) => {
    logger.info('POST');
    try {
      const response = await controller.Add(req.body);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  /**
   * This route will return all records
   */
  router.get('/', authenticationMiddleware, validate(validation.GetAll), async (req, res, next) => {
    logger.info('GET ALL');
    try {
      const response = await controller.GetAll();
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  /*
  * This route will return record by id
  */
  router.get('/:id', authenticationMiddleware, validate(validation.Get), async (req, res, next) => {
    logger.info('GET');
    try {
      const response = await controller.Get(Number(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  /*
  * This route will update record
  */
  router.put('/', authenticationMiddleware, validate(validation.Put), async (req, res, next) => {
    logger.info('PUT');
    try {
      const response = await controller.Edit(req.body);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  /*
  * This route will delete record by id
  */
  router.delete('/:id', authenticationMiddleware, validate(validation.Delete), async (req, res, next) => {
    logger.info('DELETE');
    try {
      const response = await controller.Delete(Number(req.params.id));
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

export default BaseRoute;
