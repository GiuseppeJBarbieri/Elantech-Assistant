import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import ProductRepository from './ProductRepository';
import constants from '../../utils/constants/Constants';
import BaseController from '../BaseController';

const ProductController = {
  ...BaseController(ProductRepository),

  /**
   * This function will find one product by it's product number
   * @param productNumber
   * @returns IHTTPResponse
   */
  async GetByProductNumber(productNumber: string): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await ProductRepository.GetByProductNumber(productNumber)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default ProductController;
