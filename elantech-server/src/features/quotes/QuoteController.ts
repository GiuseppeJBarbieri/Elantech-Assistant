import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import QuoteRepository from './QuoteRepository';
import constants from '../../utils/constants/Constants';
import IQuote from './IQuote';

export default {

  async GetAll() {
    try {
      const quotes = await QuoteRepository.GetAllQuotes();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...quotes],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Get(id: number): Promise<IQuote> {
    try {
      const quote: IQuote = await QuoteRepository.Get(id);
      if (!quote) {
        const response = constants.HTTP.ERROR.NOT_FOUND;
        return Promise.reject(response);
      }

      return quote;
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetByCompanyId(companyID: number) {
    try {
      const quotes = await QuoteRepository.GetByCompanyId(companyID);
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...quotes],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(quote: IQuote): Promise<IHTTPResponse> {
    try {
      await QuoteRepository.Add(quote);
      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(quote: IQuote): Promise<IHTTPResponse> {
    try {
      QuoteRepository.Edit(quote);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Delete(id: number) {
    try {
      const affectedRowCount = await QuoteRepository.Delete(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
