import ProductRepository from './ProductRepository';
import constants from '../../utils/constants/Constants';

export default {

  async GetAll() {
    try {
      const products = await ProductRepository.GetAllProducts();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...products],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
