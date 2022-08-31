import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import CompanyRepository from './CompanyRepository';
import constants from '../../utils/constants/Constants';
import ICompany from './ICompany';

export default {

  async GetByID(id: number) {
    try {
      const company = await CompanyRepository.GetByID(id);
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...company],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(company: ICompany): Promise<IHTTPResponse> {
    try {
      const _company = { ...company };

      await CompanyRepository.Add(_company);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(company: ICompany): Promise<IHTTPResponse> {
    try {
      const _company = { ...company };
      await CompanyRepository.Edit(_company);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async DeleteByID(id: number) {
    try {
      const affectedRowCount = await CompanyRepository.DeleteByID(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
