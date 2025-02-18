import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import CompanyController from './CompanyController';
import CompanyValidation from './CompanyValidation';
import BaseRoute from '../BaseRoute';

const router = BaseRoute(CompanyController, CompanyValidation);

/**
 * This route will add new company
 */
router.post('/', authenticationMiddleware, validate(CompanyValidation.PostCompany),
  (req, res, next) => {
    logger.info('POST COMPANY');
    const copy = JSON.parse(JSON.stringify(req.body));
    // eslint-disable-next-line dot-notation
    copy.userId = req.session['userId'];
    CompanyController.Add(copy)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a company by id
*/
router.delete('/:id', authenticationMiddleware, validate(CompanyValidation.DeleteCompany),
  (req, res, next) => {
    // eslint-disable-next-line dot-notation
    if (req.session['userType'] === 1) {
      CompanyController.Delete(Number(req.params.id))
        .then((response) => {
          res.status(201).json(response);
        })
        .catch((err) => next(err));
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

export default router;
