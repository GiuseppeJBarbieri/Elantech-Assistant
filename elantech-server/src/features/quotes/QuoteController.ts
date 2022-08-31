import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import QuoteRepository from './QuoteRepository';
import constants from '../../utils/constants/Constants';
import IQuote from './IQuote';

export default {

  async GetByID(id: number) {
    try {
      const quote = await QuoteRepository.GetByID(id);
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...quote],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(quote: IQuote): Promise<IHTTPResponse> {
    try {
      const _quote = { ...quote };

      await QuoteRepository.Add(_quote);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(quote: IQuote): Promise<IHTTPResponse> {
    try {
      const _quote = { ...quote };
      await QuoteRepository.Edit(_quote);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async DeleteByID(id: number) {
    try {
      const affectedRowCount = await QuoteRepository.DeleteByID(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
