import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import QuoteController from './QuoteController';
import QuoteValidation from './QuoteValidation';
import BaseRoute from '../BaseRoute';

const TAG = 'QUOTE';
const router = BaseRoute(QuoteController, QuoteValidation, TAG);

// Override the POST route
router.stack = router.stack.filter((layer) => !(layer.route
  && layer.route.path === '/'
  && layer.route.methods.post
));

/**
 * This route will add new quote
 * @route POST /
 * @group Quote Table
 * @param {IQuote} body.body.required - Quote object
 * @returns {IQuote} 201 - Quote object
 * @returns {Error}  default - Unexpected error
 */
router.post('/',
  authenticationMiddleware,
  validate(QuoteValidation.Post),
  (req, res, next) => {
    logger.info(`POST ${TAG}`);
    req.body.userId = req.session['userId'];
    QuoteController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will fetch all quotes by company id
* @route GET /company/{companyId}
* @group Quote Table
* @param {number} companyId.path.required - Company id
* @returns {IQuote} 200 - Quote object
* @returns {Error}  default - Unexpected error
*/
router.get('/company/:companyId',
  authenticationMiddleware,
  validate(QuoteValidation.GetQuoteByCompanyId),
  (req, res, next) => {
    logger.info(`GET ${TAG} BY COMPANY ID`);

    QuoteController.GetByCompanyId(Number(req.params.companyId))
      .then((quotes) => {
        res.status(200).json(quotes);
      })
      .catch((err) => next(err));
  });

/**
* This route will update a quote
* @route PUT /
* @group Quote Table
* @param {IQuote} body.body.required - Quote object
* @returns {IQuote} 201 - Quote object
* @returns {Error}  default - Unexpected error
*/
router.put('/quotedProduct',
  authenticationMiddleware,
  validate(QuoteValidation.PutQuoteAndProducts),
  (req, res, next) => {
    logger.info(`PUT ${TAG} WITH QUOTED PRODUCTS`);

    QuoteController.UpdateQuotedProducts(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
