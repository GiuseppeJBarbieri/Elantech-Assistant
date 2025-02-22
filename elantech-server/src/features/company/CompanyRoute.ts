import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import CompanyController from './CompanyController';
import CompanyValidation from './CompanyValidation';
import BaseRoute from '../BaseRoute';

const TAG = 'COMPANY';
const router = BaseRoute(CompanyController, CompanyValidation, TAG);

/**
 * This route will add new company
 * @route POST /
 * @group Company Table
 * @param {ICompany} body.body.required - Company object
 * @returns {ICompany} 201 - Company object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', authenticationMiddleware, validate(CompanyValidation.Post),
  (req, res, next) => {
    logger.info(`POST ${TAG}`);

    CompanyController.Add({ ...req.body, userId: req.session['userId'] })
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a company by id
* @route DELETE /{id}
* @group Company Table
* @param {number} id.path.required - Company id
* @returns {void} 201 - Company deleted
* @returns {Error}  default - Unexpected error
*/
router.delete('/:id', authenticationMiddleware, validate(CompanyValidation.Delete),
  (req, res, next) => {
    logger.info(`DELETE ${TAG}`);

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
