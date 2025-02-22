import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import QuoteController from './QuoteController';
import QuoteValidation from './QuoteValidation';
import BaseRoute from '../BaseRoute';

const router = BaseRoute(QuoteController, QuoteValidation, 'QUOTE');

/**
 * This route will add new quote
 */
router.post('/',
  authenticationMiddleware,
  validate(QuoteValidation.Post),
  (req, res, next) => {
    logger.info('POST QUOTE');
    const copy = JSON.parse(JSON.stringify(req.body));
    copy.userId = req.session['userId'];
    QuoteController.Add(copy)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will fetch all quotes by company id
*/
router.get('/company/:companyId', authenticationMiddleware, validate(QuoteValidation.GetQuoteByCompanyId),
  (req, res, next) => {
    logger.info('GET QUOTE BY COMPANY ID');
    QuoteController.GetByCompanyId(Number(req.params.companyId))
      .then((quotes) => res.status(200).json(quotes))
      .catch((err) => next(err));
  });

/**
* This route will update a quote
*/
router.put('/quotedProduct', authenticationMiddleware, validate(QuoteValidation.PutQuoteAndProducts),
  (req, res, next) => {
    logger.info('PUT QUOTE WITH QUOTED PRODUCTS');

    QuoteController.UpdateQuotedProducts(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
