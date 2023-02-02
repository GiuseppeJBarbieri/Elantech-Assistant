import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import QuoteController from './QuoteController';
import QuoteValidation from './QuoteValidation';

const router = express.Router();

/**
 * This route will add new quote
 */
router.post('/', authenticationMiddleware, validate(QuoteValidation.PostQuote),
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
* This route will fetch all quotes.
*/
router.get('/', authenticationMiddleware, validate(QuoteValidation.GetAllQuotes),
  (req, res, next) => {
    logger.info('GET ALL QUOTES');

    QuoteController.GetAll()
      .then((quotes) => res.status(200).json(quotes))
      .catch((err) => next(err));
  });

/**
* This route will fetch a quote by id
*/
router.get('/:id', authenticationMiddleware, validate(QuoteValidation.GetQuote),
  (req, res, next) => {
    logger.info('GET QUOTE');

    QuoteController.Get(Number(req.params.id))
      .then((quote) => res.status(200).json(quote))
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
router.put('/', authenticationMiddleware, validate(QuoteValidation.PutQuote),
  (req, res, next) => {
    logger.info('PUT QUOTE');

    QuoteController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a quote by id
*/
router.delete('/:id', authenticationMiddleware, validate(QuoteValidation.DeleteQuote),
  (req, res, next) => {
    logger.info('DELETE QUOTE');

    QuoteController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
