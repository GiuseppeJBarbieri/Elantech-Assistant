import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ProductController from './ProductController';
import ProductValidation from './ProductValidation';

const router = express.Router();

/**
 * This route will add a new product
 */
router.post('/', authenticationMiddleware, validate(ProductValidation.PostProduct),
  (req, res, next) => {
    logger.info('POST PRODUCT');
    // eslint-disable-next-line dot-notation
    req.body.userId = req.session['userId'];
    ProductController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will fetch all products.
 */
router.get('/', authenticationMiddleware, validate(ProductValidation.GetAllProducts),
  (req, res, next) => {
    logger.info('GET ALL PRODUCTS');

    ProductController.GetAll()
      .then((products) => res.status(200).json(products))
      .catch((err) => next(err));
  });

/**
 * This route will fetch a product by productNumber
 */
router.get('/:productNumber', authenticationMiddleware, validate(ProductValidation.GetProduct), (req, res, next) => {
  logger.info('GET PRODUCT');

  ProductController.GetByProductNumber(req.params.productNumber)
    .then((product) => res.status(200).json(product))
    .catch((err) => next(err));
});

/**
 * This route will update a product
 */
router.put('/', authenticationMiddleware, validate(ProductValidation.PutProduct),
  (req, res, next) => {
    logger.info('PUT PRODUCT');
    ProductController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a product by product number
*/
router.delete('/:id',
  authenticationMiddleware,
  validate(ProductValidation.DeleteProduct), (req, res, next) => {
    logger.info('DELETE PRODUCT');

    ProductController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
