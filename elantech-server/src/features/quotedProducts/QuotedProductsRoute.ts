import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import QuotedProductsController from './QuotedProductsController';
import QuotedProductsValidation from './QuotedProductsValidation';

const router = express.Router();

/**
 * This route will fetch all Inventory by product number.
 */
router.get('/:id',
  authenticationMiddleware, validate(QuotedProductsValidation.GetQuotedProducts), (req, res, next) => {
    logger.info('GET ALL QUOTEDPRODUCTSS');

    QuotedProductsController.GetByID(Number(req.params.id))
      .then((QuotedProducts) => res.status(200).json(QuotedProducts))
      .catch((err) => next(err));
  });

/**
 * This route will add new inventory
 */
router.post('/', validate(QuotedProductsValidation.PostQuotedProducts),
  (req, res, next) => {
    logger.info('POST QUOTEDPRODUCTS');
    QuotedProductsController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will update a inventory
*/
router.put('/', authenticationMiddleware, validate(QuotedProductsValidation.PutQuotedProducts),
  (req, res, next) => {
    logger.info('PUT QUOTEDPRODUCTS');

    QuotedProductsController.Edit(req.body)
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
  validate(QuotedProductsValidation.DeleteQuotedProducts), (req, res, next) => {
    logger.info('DELETE QUOTEDPRODUCTS');

    QuotedProductsController.DeleteByID(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
