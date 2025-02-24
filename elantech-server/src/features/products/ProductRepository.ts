import { Transaction } from 'sequelize';
import db from '../../models';
import BaseRepository from '../BaseRepository';
import IProduct from './IProduct';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';

const repoErr: IRepoError = {
  location: 'ProductRepository',
  statusCode: 500,
};

const ProductRepository = {
  ...BaseRepository(db.product, repoErr),

  /**
   * This function will find one product by it's product number
   * @param productNumber
   * @returns IProduct
   */
  async GetByProductNumber(productNumber: string): Promise<IProduct> {
    try {
      return await db.product.findOne({
        where: { productNumber },
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  /**
   * This function will delete a product by it's id
   * @param id
   * @returns <Promise<void>>
   */
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
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },
};

export default ProductRepository;
