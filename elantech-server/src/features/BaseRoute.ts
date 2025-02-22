import * as express from 'express';
import validate from '../middleware/JoiValidator';
import logger from '../utils/logging/Logger';
import authenticationMiddleware from '../middleware/Auth';

/*
* This is a base route which will be extended by other routes
* @param controller
* @param validation
*/
const BaseRoute = (controller: any, validation: any, name: string) => {
  const router = express.Router();

  /**
   * This route will add new record
   * @route POST /
   * @group ${name} Table
   * @param {I${name}} body.body.required - ${name} object
   * @returns {I${name}} 201 - ${name} object
   * @returns {Error}  default - Unexpected error
   */
  router.post('/', authenticationMiddleware, validate(validation.Post), async (req, res, next) => {
    logger.info(`POST ${name}`);
    try {
      const response = await controller.Add(req.body);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  /**
   * This route will return all records
   * @route GET /
   * @group ${name} Table
   * @returns {Array.<I${name}>} 200 - An array of ${name} object
   * @returns {Error}  default - Unexpected error
   */
  router.get('/', authenticationMiddleware, validate(validation.GetAll), async (req, res, next) => {
    logger.info(`GET ALL ${name}`);
    try {
      const response = await controller.GetAll();
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  /**
  * This route will return record by id
  * @route GET /{id}
  * @group ${name} Table
  * @param {number} id.path.required - ${name} id
  * @returns {I${name}} 200 - ${name} object
  * @returns {Error}  default - Unexpected error
  */
  router.get('/:id', authenticationMiddleware, validate(validation.Get), async (req, res, next) => {
    logger.info(`GET ${name}`);
    try {
      const response = await controller.Get(Number(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  /**
  * This route will update record
  * @route PUT /
  * @group ${name} Table
  * @param {I${name}} body.body.required - ${name} object
  * @returns {I${name}} 201 - ${name} object
  * @returns {Error}  default - Unexpected error
  */
  router.put('/', authenticationMiddleware, validate(validation.Put), async (req, res, next) => {
    logger.info(`PUT ${name}`);
    try {
      const response = await controller.Edit(req.body);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  /**
  * This route will delete record by id
  * @route DELETE /{id}
  * @group ${name} Table
  * @param {number} id.path.required - ${name} id
  * @returns {void} 201 - ${name} deleted
  * @returns {Error}  default - Unexpected error
  */
  router.delete('/:id', authenticationMiddleware, validate(validation.Delete), async (req, res, next) => {
    logger.info(`DELETE ${name}`);
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
