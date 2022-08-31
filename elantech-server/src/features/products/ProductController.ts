import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import ProductRepository from './ProductRepository';
import constants from '../../utils/constants/Constants';
import { IProduct, IProductUPDATE } from './IProduct';

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

  async GetByProductNumber(productNumber): Promise<IProduct> {
    try {
      const product: IProduct = await ProductRepository.GetByProductNumber(productNumber);
      if (!product) {
        const response = constants.HTTP.ERROR.NOT_FOUND;
        return Promise.reject(response);
      }

      return product;
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(product: IProduct): Promise<IHTTPResponse> {
    try {
      const _product = { ...product };

      await ProductRepository.Add(_product);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(product: IProductUPDATE): Promise<IHTTPResponse> {
    try {
      const _product: IProduct = { ...product };
      const { oldProductNumber } = product;

      await ProductRepository.Edit(_product, oldProductNumber);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async DeleteByProductNumber(productNumber: string) {
    try {
      const affectedRowCount = await ProductRepository.DeleteByProductNumber(productNumber);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
