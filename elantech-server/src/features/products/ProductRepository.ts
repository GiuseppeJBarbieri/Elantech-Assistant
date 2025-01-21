import { Transaction } from 'sequelize';
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
  async Add(product: IProduct): Promise<IProduct> {
    try {
      return await db.product.create(product);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      standardError(err);
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

  async Edit(product: IProduct): Promise<IProduct> {
    try {
      return await db.product.update(product, {
        where: {
          id: product.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Delete(id: number): Promise<void> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      const inventory = await db.inventory.findAll({
        where: {
          productId: id,
        },
      });

      inventory.forEach(async (item) => {
        await db.inventory.destroy({
          where: { id: item.id },
          transaction,
        });
      });

      await db.product.destroy({
        where: {
          id,
        },
        transaction,
      });
      const resolution = transaction.commit();
      return resolution;
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },
};
