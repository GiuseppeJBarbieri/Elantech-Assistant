import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ProductController from './ProductController';
import ProductValidation from './ProductValidation';
import BaseRoute from '../BaseRoute';

const router = BaseRoute(ProductController, ProductValidation);

/**
 * This route will fetch a product by productNumber
 */
router.get('/:productNumber', authenticationMiddleware, validate(ProductValidation.Get),
  (req, res, next) => {
    logger.info('GET PRODUCT');

    ProductController.GetByProductNumber(req.params.productNumber)
      .then((product) => res.status(200).json(product))
      .catch((err) => next(err));
  });

/**
* This route will delete a product by product number
*/
router.delete('/:id', authenticationMiddleware, validate(ProductValidation.Delete), (req, res, next) => {
  logger.info('DELETE PRODUCT');
  // eslint-disable-next-line dot-notation
  if (req.session['userType'] === 1) {
    ProductController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
