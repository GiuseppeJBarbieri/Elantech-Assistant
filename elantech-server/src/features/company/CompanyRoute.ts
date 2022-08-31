import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import CompanyController from './CompanyController';
import CompanyValidation from './CompanyValidation';

const router = express.Router();

/**
 * This route will fetch all Inventory by product number.
 */
router.get('/:id',
  authenticationMiddleware, validate(CompanyValidation.GetCompany), (req, res, next) => {
    logger.info('GET ALL COMPANYS');

    CompanyController.GetByID(Number(req.params.id))
      .then((Company) => res.status(200).json(Company))
      .catch((err) => next(err));
  });

/**
 * This route will add new inventory
 */
router.post('/', validate(CompanyValidation.PostCompany),
  (req, res, next) => {
    logger.info('POST COMPANY');
    CompanyController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will update a inventory
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
* This route will delete a product by product number
*/
router.delete('/:id',
  authenticationMiddleware,
  validate(CompanyValidation.DeleteCompany), (req, res, next) => {
    logger.info('DELETE COMPANY');

    CompanyController.DeleteByID(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
