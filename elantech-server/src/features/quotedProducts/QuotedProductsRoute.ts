import BaseRoute from '../BaseRoute';
import QuotedProductsController from './QuotedProductsController';
import QuotedProductsValidation from './QuotedProductsValidation';

const router = BaseRoute(QuotedProductsController, QuotedProductsValidation);

/**
 * This route will get a quoted product by quote id
 */
router.get('/quote/:quoteId', async (req, res, next) => {
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
router.get('/product/:productId', async (req, res, next) => {
  try {
    const response = await QuotedProductsController.GetByProductId(Number(req.params.productId));
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
