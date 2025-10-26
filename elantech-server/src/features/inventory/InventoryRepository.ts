import { Transaction } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IInventory from './IInventory';
import IRemovedInventory from '../removedInventory/IRemovedInventory';
import EventBus from '../../utils/EventBus';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'InventoryRepository.js',
  statusCode: 500,
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
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
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
      const updatedProduct = await db.product.update(
        { quantity: numOfInventory },
        {
          where: {
            id: inventory.productId,
          },
        },
      );
      EventBus.emit('product.updated', {
        action: 'updated',
        ids: [updatedProduct.id],
        timestamp: Date.now(),
      });
      return;
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
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

      const updatedProduct = await db.product.update(
        { quantity: numOfInventory },
        {
          where: {
            id: inventory[0].productId,
          },
        },
        { transaction },
      );
      await transaction.commit();

      EventBus.emit('product.updated', {
        action: 'updated',
        ids: [updatedProduct.id],
        timestamp: Date.now(),
      });

      return Promise.resolve(list);
    } catch (err) {
      await transaction.rollback();
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
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
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
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
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },
  async EditReceivingMultiple(inventoryList: IInventory[], receivedItemId: number): Promise<IInventory[]> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      let numOfInventory = await db.inventory.count({
        where: {
          productId: inventoryList[0].productId,
        },
      });

      numOfInventory += inventoryList.length;

      const list = await db.inventory.bulkCreate(inventoryList, { transaction });

      const updatedProduct = await db.product.update(
        { quantity: numOfInventory },
        {
          where: {
            id: inventoryList[0].productId,
          },
        },
        { transaction },
      );
      db.receivedItem.update(
        { finishedAdding: true },
        {
          where: {
            id: receivedItemId,
          },
        },
        { transaction },
      );

      EventBus.emit('product.updated', {
        action: 'updated',
        ids: [updatedProduct.id],
        timestamp: Date.now(),
      });

      await transaction.commit();

      return Promise.resolve(list);
    } catch (err) {
      await transaction.rollback();
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  async Delete(inventoryList: IInventory[]): Promise<void> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      // This should be temporary, need to make sure the corret quantity has been given.
      // Want to actually track what's getting added.
      // Will log inconsistencies
      const currInvList = await db.inventory.findAll({
        where: { productId: inventoryList[0].productId },
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

      await Promise.all(inventoryList.map(async (inventory) => {
        const removedProductObj: IRemovedInventory = inventory.removedInventory;

        // Create the Removed Entry + return the ID
        const createdRemovedProduct = await db.removedInventory.create(removedProductObj, { transaction });

        // add the removed entry id to the inventory obj
        const inventoryCopy = { ...inventory, removedInventoryId: createdRemovedProduct.id };

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
      }));
      // Get the quantity of the product
      const product = await db.product.findOne({ where: { id: inventoryList[0].productId }, transaction });
      let quantity = 0;
      if (currInvList.length !== product.quantity) {
        const repoError = {
          ...repoErr,
          message:
            `Product.Quantity and Actual Inventory items do not match up! 
          Inventory: ${currInvList.length} + Product.Quantity: ${product.quantity}`,
        };
        logger.warn(repoError);
        quantity = currInvList.length - inventoryList.length;
      } else {
        quantity = product.quantity - inventoryList.length;
      }
      // Update quantity for the product
      const updatedProduct = await db.product.update(
        { quantity },
        {
          where: {
            id: product.id,
          },
        },
        transaction,
      );
      await transaction.commit();
      EventBus.emit('product.updated', {
        action: 'updated',
        ids: [updatedProduct.id],
        timestamp: Date.now(),
      });
      return;
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

};
