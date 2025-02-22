import { Transaction } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IInventory from './IInventory';
import IRemovedInventory from '../removedInventory/IRemovedInventory';

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
        where: { productId },
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        include: [
          {
            model: db.receiving,
            required: false,
            attributes: ['id', 'companyId', 'userId', 'purchaseOrderNumber',
              'orderType', 'trackingNumber', 'dateReceived', 'shippedVia', 'comment'],
            as: 'receiving',
            include: [
              {
                model: db.company,
                attributes: ['name'],
                required: false,
                as: 'company',
              },
            ],
          },
        ],
      }) as IInventory[];
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Add(inventory: IInventory): Promise<IInventory> {
    try {
      const _inventory = inventory;

      await db.inventory.create(_inventory);
      const numOfInventory = await db.inventory.count({
        where: {
          productId: _inventory.productId,
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

  async AddMultiple(inventory: IInventory[]): Promise<IInventory[]> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      let numOfInventory = await db.inventory.count({
        where: {
          productId: inventory[0].productId,
        },
      });

      numOfInventory += inventory.length;

      const list = await db.inventory.bulkCreate(inventory, { transaction });

      await db.product.update(
        { quantity: numOfInventory },
        {
          where: {
            id: inventory[0].productId,
          },
        },
        { transaction },
      );
      await transaction.commit();

      return Promise.resolve(list);
    } catch (err) {
      await transaction.rollback();
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Edit(inventory: IInventory): Promise<IInventory> {
    try {
      const _inventory = inventory;
      delete _inventory.purchaseOrderId;
      delete _inventory.removedInventoryId;

      return await db.inventory.update(_inventory, {
        where: {
          id: _inventory.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async EditMultiple(inventoryList: IInventory[]): Promise<IInventory[]> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      inventoryList.forEach((inventory) => {
        db.inventory.update(
          inventory,
          {
            where: {
              id: inventory.id,
            },
          },
          { transaction },
        );
      });
      await transaction.commit();
      return Promise.resolve(inventoryList);
    } catch (err) {
      await transaction.rollback();
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

  async Delete(inventory: IInventory): Promise<any[]> {
    try {
      const transaction: Transaction = await db.sequelize.transaction();
      const removedProductObj: IRemovedInventory = inventory.removedInventory;
      delete removedProductObj.id;
      // Create the Removed Entry + return the ID
      const createdRemovedProduct = await db.removedInventory.create(removedProductObj, { transaction });
      // add the removed entry id to the inventory obj
      const inventoryCopy = inventory;
      inventoryCopy.removedInventoryId = createdRemovedProduct.id;
      // update the inventory obj
      await db.inventory.update(inventoryCopy, {
        where: {
          id: inventoryCopy.id,
        },
        transaction,
      });
      // remove the inventory obj
      await db.inventory.destroy({
        where: {
          id: inventoryCopy.id,
        },
        transaction,
      });
      // Get the quantity of the product
      const product = await db.product.findOne({ where: { id: inventory.productId } });
      const quantity = product.quantity - 1;
      // Update quantity for the product
      await db.product.update(
        { quantity },
        {
          where: {
            id: product.id,
          },
        },
        transaction,
      );
      await transaction.commit();
      return Promise.resolve([]);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
