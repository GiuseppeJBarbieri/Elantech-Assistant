import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ProductController from './ProductController';
import ProductValidation from './ProductValidation';

const router = express.Router();

/**
 * This route will fetch all drivers
 */
router.get('/', authenticationMiddleware, validate(ProductValidation.GetAllProducts), (req, res, next) => {
  logger.info('GET ALL PRODUCTS');

  ProductController.GetAll()
    .then((products) => res.status(200).json(products))
    .catch((err) => next(err));
});
export default router;
