import { Transaction } from 'sequelize';
import db from '../../models';
import BaseRepository from '../BaseRepository';
import IProduct from './IProduct';
import logger from '../../utils/logging/Logger';

const ProductRepository = {
  ...BaseRepository(db.product),

  async GetByProductNumber(productNumber: string): Promise<IProduct> {
    try {
      return await db.product.findOne({
        where: { productNumber },
      });
    } catch (err) {
      logger.warn(err.message);
      throw err;
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
      logger.warn(err.message);
      throw err;
    }
  },
};

export default ProductRepository;
