import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import CompanyRepository from './CompanyRepository';
import constants from '../../utils/constants/Constants';
import ICompany from './ICompany';

export default {

  async GetAll() {
    try {
      const companies = await CompanyRepository.GetAllCompanies();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...companies],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Get(id: number): Promise<ICompany> {
    try {
      const company: ICompany = await CompanyRepository.Get(id);
      if (!company) {
        const response = constants.HTTP.ERROR.NOT_FOUND;
        return Promise.reject(response);
      }

      return company;
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(company: ICompany): Promise<IHTTPResponse> {
    try {
      await CompanyRepository.Add(company);
      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(company: ICompany): Promise<IHTTPResponse> {
    try {
      CompanyRepository.Edit(company);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Delete(id: number) {
    try {
      const affectedRowCount = await CompanyRepository.Delete(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
