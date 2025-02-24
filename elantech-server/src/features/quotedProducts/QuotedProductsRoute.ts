import logger from '../../utils/logging/Logger';
import BaseRoute from '../BaseRoute';
import QuotedProductsController from './QuotedProductsController';
import QuotedProductsValidation from './QuotedProductsValidation';
import authenticationMiddleware from '../../middleware/Auth';
import validate from '../../middleware/JoiValidator';
import QuoteValidation from '../quotes/QuoteValidation';

const TAG = 'QUOTED PRODUCT';

const router = BaseRoute(QuotedProductsController, QuotedProductsValidation, TAG);

/**
 * This route will get a quoted product by quote id
 * @route GET /quote/{quoteId}
 * @group Quoted Product Table
 * @param {number} quoteId.path.required - Quote id
 * @returns {IQuotedProduct} 200 - Quoted product object
 * @returns {Error}  default - Unexpected error
 */
router.get('/quote/:quoteId',
  authenticationMiddleware,
  validate(QuoteValidation.Get),
  async (req, res, next) => {
    logger.info(`GET ${TAG} BY QUOTE ID`);

    QuotedProductsController.GetByQuoteId(Number(req.params.quoteId))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will get a quoted product by product id
 * @route GET /product/{productId}
 * @group Quoted Product Table
 * @param {number} productId.path.required - Product id
 * @returns {IQuotedProduct} 200 - Quoted product object
 * @returns {Error}  default - Unexpected error
 */
router.get('/product/:productId',
  authenticationMiddleware,
  validate(QuoteValidation.GetQuoteByProductId),
  async (req, res, next) => {
    logger.info(`GET ${TAG} BY QUOTE ID`);

    QuotedProductsController.GetByProductId(Number(req.params.productId))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
