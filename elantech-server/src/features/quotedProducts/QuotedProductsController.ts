import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import QuotedProductsRepository from './QuotedProductsRepository';
import constants from '../../utils/constants/Constants';
import BaseController from '../BaseController';

const QuotedProductsController = {
  ...BaseController(QuotedProductsRepository),

  /**
   * This function will find all quoted products by quote id
   * @param quoteId
   * @returns IHTTPResponse
   */
  async GetByQuoteId(quoteId: number): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await QuotedProductsRepository.GetByQuoteId(quoteId)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
   * This function will find all quoted products by product id
   * @param productId
   * @returns IHTTPResponse
   */
  async GetByProductId(productId: number): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await QuotedProductsRepository.GetByProductId(productId)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default QuotedProductsController;
