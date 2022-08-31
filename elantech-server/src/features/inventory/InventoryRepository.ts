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
  async GetByProductNumber(productNumber: string): Promise<IInventory[]> {
    try {
      return await db.inventory.findAll({
        where: {
          [Op.and]: [
            {
              productNumber,
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
      return await db.inventory.create(inventory);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Edit(inventory): Promise<IInventory> {
    try {
      return await db.inventory.update(inventory, {
        where: {
          inventoryNumber: inventory.productNumber,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async DeleteBySerialNumber(serialNumber: string): Promise<IInventory[]> {
    try {
      return await db.inventory.delete({
        where: { serialNumber },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
