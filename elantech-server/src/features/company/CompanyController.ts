import CompanyRepository from './CompanyRepository';
import BaseController from '../../utils/BaseController';

const CompanyController = {
  ...BaseController(CompanyRepository),
};

export default CompanyController;
