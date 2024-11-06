import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import QuotedProductsRepository from './QuotedProductsRepository';
import constants from '../../utils/constants/Constants';
import IQuotedProduct from './IQuotedProduct';

export default {

  async GetAll() {
    try {
      const quotedProducts = await QuotedProductsRepository.GetAllQuotes();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...quotedProducts],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Get(id: number): Promise<IQuotedProduct> {
    try {
      const quote: IQuotedProduct = await QuotedProductsRepository.Get(id);
      if (!quote) {
        const response = constants.HTTP.ERROR.NOT_FOUND;
        return Promise.reject(response);
      }

      return quote;
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetByQuoteId(quoteId: number) {
    try {
      const quotedProducts = await QuotedProductsRepository.GetByQuoteId(quoteId);

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...quotedProducts],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetByProductId(productId: number): Promise<IHTTPResponse> {
    try {
      const quotedProducts: IQuotedProduct[] = await QuotedProductsRepository.GetByProductId(productId);
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...quotedProducts],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(quotedProduct: IQuotedProduct): Promise<IHTTPResponse> {
    try {
      // const _quotedProduct = { ...quotedProduct };
      await QuotedProductsRepository.Add(quotedProduct);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(quotedProduct: IQuotedProduct): Promise<IHTTPResponse> {
    try {
      QuotedProductsRepository.Edit(quotedProduct);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Delete(id: number) {
    try {
      const affectedRowCount = await QuotedProductsRepository.Delete(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
