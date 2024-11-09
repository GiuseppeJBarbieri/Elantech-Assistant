import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import CompanyController from './CompanyController';
import CompanyValidation from './CompanyValidation';

const router = express.Router();

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
* This route will fetch all companies.
*/
router.get('/', authenticationMiddleware, validate(CompanyValidation.GetAllCompanies),
  (req, res, next) => {
    logger.info('GET ALL COMPANIES');

    CompanyController.GetAll()
      .then((companies) => res.status(200).json(companies))
      .catch((err) => next(err));
  });

/**
* This route will fetch a company by id
*/
router.get('/:id', authenticationMiddleware, validate(CompanyValidation.GetCompany),
  (req, res, next) => {
    logger.info('GET COMPANY');

    CompanyController.Get(Number(req.params.id))
      .then((company) => res.status(200).json(company))
      .catch((err) => next(err));
  });

/**
* This route will update a company
*/
router.put('/', authenticationMiddleware, validate(CompanyValidation.PutCompany),
  (req, res, next) => {
    logger.info('PUT COMPANY');

    CompanyController.Edit(req.body)
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
