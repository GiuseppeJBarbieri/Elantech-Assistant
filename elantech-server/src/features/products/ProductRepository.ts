import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IProduct from './IProduct';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'ProductRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(product): Promise<IProduct> {
    try {
      return await db.product.create(product);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetAllProducts(): Promise<IProduct[]> {
    try {
      return await db.product.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByProductNumber(productNumber: string): Promise<IProduct> {
    try {
      return await db.product.findOne({
        where: { productNumber },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(product): Promise<IProduct> {
    try {
      return await db.product.update(product, {
        where: {
          productNumber: product.productNumber,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async DeleteByProductNumber(product: string): Promise<IProduct[]> {
    try {
      return await db.product.destroy({
        where: { product },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },
};
