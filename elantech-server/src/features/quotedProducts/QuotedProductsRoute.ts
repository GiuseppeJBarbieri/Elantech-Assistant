import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import QuotedProductsController from './QuotedProductsController';
import QuotedProductsValidation from './QuotedProductsValidation';

const router = express.Router();

/**
 * This route will add new QuotedProducts
 */
router.post('/', authenticationMiddleware, validate(QuotedProductsValidation.PostQuotedProducts),
  (req, res, next) => {
    logger.info('POST QUOTED PRODUCT');
    QuotedProductsController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        next(err);
        console.log(err, req.body);
      });
  });

/**
* This route will fetch all QuotedProducts.
*/
router.get('/', authenticationMiddleware, validate(QuotedProductsValidation.GetAllQuotedProducts),
  (req, res, next) => {
    logger.info('GET ALL QUOTED PRODUCTS');

    QuotedProductsController.GetAll()
      .then((quotedProducts) => res.status(200).json(quotedProducts))
      .catch((err) => next(err));
  });

/**
* This route will fetch a QuotedProducts by id
*/
router.get('/:id', authenticationMiddleware, validate(QuotedProductsValidation.GetQuotedProducts),
  (req, res, next) => {
    logger.info('GET QUOTED PRODUCT');

    QuotedProductsController.Get(Number(req.params.id))
      .then((quotedProduct) => res.status(200).json(quotedProduct))
      .catch((err) => next(err));
  });

/**
* This route will fetch all QuotedProducts by quote id
*/
router.get('/quote/:quoteId', authenticationMiddleware, validate(QuotedProductsValidation.GetQuotedProductByQuoteId),
  (req, res, next) => {
    logger.info('GET QUOTED PRODUCT BY QUOTE ID');

    QuotedProductsController.GetByQuoteId(Number(req.params.quoteId))
      .then((quotedProducts) => res.status(200).json(quotedProducts))
      .catch((err) => next(err));
  });
/**
 * This route will get quotes in ProductQuotesTable Format
 */
router.get('/quote/productQuotes/:productId',
  authenticationMiddleware,
  validate(QuotedProductsValidation.GetProductQuotesTable),
  (req, res, next) => {
    logger.info('GET PRODUCT QUOTES BY PRODUCT ID');
    QuotedProductsController.GetByProductId(Number(req.params.productId))
      .then((quotedProducts) => res.status(200).json(quotedProducts))
      .catch((err) => next(err));
  });

/**
* This route will update a QuotedProducts
*/
router.put('/', authenticationMiddleware, validate(QuotedProductsValidation.PutQuotedProducts),
  (req, res, next) => {
    logger.info('PUT QUOTED PRODUCT');

    QuotedProductsController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });
/**
* This route will delete a quote by id
*/
router.delete('/:id', authenticationMiddleware, validate(QuotedProductsValidation.DeleteQuotedProducts),
  (req, res, next) => {
    logger.info('DELETE QUOTED PRODUCT');

    QuotedProductsController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
