import CompanyRepository from './CompanyRepository';
import BaseController from '../BaseController';

const CompanyController = {
  ...BaseController(CompanyRepository),
};

export default CompanyController;
