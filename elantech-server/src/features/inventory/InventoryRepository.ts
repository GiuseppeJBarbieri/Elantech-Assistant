import { Op } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IInventory from './IInventory';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'InventoryRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async GetByProductId(productId: number): Promise<IInventory[]> {
    try {
      return await db.inventory.findAll({
        where: {
          [Op.and]: [
            {
              productId,
            },
          ],
        },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Add(inventory): Promise<IInventory> {
    try {
      await db.inventory.create(inventory);
      const numOfInventory = await db.inventory.count({
        where: {
          productId: inventory.productId,
        },
      });
      await db.product.update(
        { quantity: numOfInventory },
        {
          where: {
            id: inventory.productId,
          },
        },
      );
      return;
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Edit(inventory: IInventory): Promise<IInventory> {
    try {
      const _inventory = inventory;
      delete _inventory.poId;
      delete _inventory.removedId;

      return await db.inventory.update(inventory, {
        where: {
          id: inventory.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Delete(id: number): Promise<IInventory[]> {
    try {
      // get product id
      const inventory = await db.inventory.findOne({
        where: { id },
      });
      // Delete from inventory
      const result = await db.inventory.destroy({
        where: { id },
      });
      // Get num of entries
      const numOfInventory = await db.inventory.count({
        where: {
          productId: inventory.productId,
        },
      });
      // Update quantity
      await db.product.update(
        { quantity: numOfInventory },
        {
          where: {
            id: inventory.productId,
          },
        },
      );
      return result;
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
