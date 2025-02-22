import BaseRoute from '../BaseRoute';
import QuotedProductsController from './QuotedProductsController';
import QuotedProductsValidation from './QuotedProductsValidation';
import authenticationMiddleware from '../../middleware/Auth';
import validate from '../../middleware/JoiValidator';
import QuoteValidation from '../quotes/QuoteValidation';

const router = BaseRoute(QuotedProductsController, QuotedProductsValidation, 'QUOTED PRODUCT');

/**
 * This route will get a quoted product by quote id
 */
router.get('/quote/:quoteId',
  authenticationMiddleware,
  validate(QuoteValidation.Get),
  async (req, res, next) => {
    /**
  * This route will delete a product by product number
  */
    try {
      const response = await QuotedProductsController.GetByQuoteId(Number(req.params.quoteId));
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

/**
 * This route will get a quoted product by product id
 */
router.get('/product/:productId',
  authenticationMiddleware,
  validate(QuoteValidation.Get),
  async (req, res, next) => {
    try {
      const response = await QuotedProductsController.GetByProductId(Number(req.params.productId));
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

export default router;
