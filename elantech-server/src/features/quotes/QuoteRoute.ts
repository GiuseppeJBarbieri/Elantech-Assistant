import BaseRoute from '../BaseRoute';
import QuoteController from './QuoteController';
import QuoteValidation from './QuoteValidation';

const router = BaseRoute(QuoteController, QuoteValidation);

router.get('/company/:companyId', async (req, res, next) => {
  try {
    const response = await QuoteController.GetByCompanyId(Number(req.params.companyId));
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.put('/quotedProduct', async (req, res, next) => {
  try {
    const response = await QuoteController.UpdateQuotedProducts(req.body);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
