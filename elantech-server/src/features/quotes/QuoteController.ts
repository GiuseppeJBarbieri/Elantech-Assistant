import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import QuoteRepository from './QuoteRepository';
import constants from '../../utils/constants/Constants';
import BaseController from '../BaseController';
import IQuote from './IQuote';

const QuoteController = {
  ...BaseController(QuoteRepository),

  async GetByCompanyId(companyID: number): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await QuoteRepository.GetByCompanyId(companyID)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async UpdateQuotedProducts(quote: IQuote): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.UPDATE,
        payload: [await QuoteRepository.UpdateQuotedProducts(quote)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default QuoteController;
