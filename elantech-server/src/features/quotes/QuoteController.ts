import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import QuoteRepository from './QuoteRepository';
import constants from '../../utils/constants/Constants';
import BaseController from '../BaseController';
import IQuote from './IQuote';

const QuoteController = {
  ...BaseController(QuoteRepository),

  /**
   * This function will fetch all quotes by company id
   * @param companyID
   * @returns IHTTPResponse
   */
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

  /**
   * This function will update a quote
   * @param quote
   * @returns IHTTPResponse
   */
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
