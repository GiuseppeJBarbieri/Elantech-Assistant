import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import ProductRepository from './ProductRepository';
import constants from '../../utils/constants/Constants';
import BaseController from '../../utils/BaseController';

const ProductController = {
  ...BaseController(ProductRepository),

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
