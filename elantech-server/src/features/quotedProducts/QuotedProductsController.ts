import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import QuotedProductsRepository from './QuotedProductsRepository';
import constants from '../../utils/constants/Constants';
import IQuotedProducts from './IQuotedProducts';

export default {

  async GetByID(id: number) {
    try {
      const quotedproducts = await QuotedProductsRepository.GetByID(id);
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...quotedproducts],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(quotedproducts: IQuotedProducts): Promise<IHTTPResponse> {
    try {
      const _quotedproducts = { ...quotedproducts };

      await QuotedProductsRepository.Add(_quotedproducts);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(quotedproducts: IQuotedProducts): Promise<IHTTPResponse> {
    try {
      const _quotedproducts = { ...quotedproducts };
      await QuotedProductsRepository.Edit(_quotedproducts);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async DeleteByID(id: number) {
    try {
      const affectedRowCount = await QuotedProductsRepository.DeleteByID(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
