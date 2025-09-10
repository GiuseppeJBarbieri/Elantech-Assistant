import { Transaction } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IReceivedItem from './IReceivedItem';
import BaseRepository from '../BaseRepository';

const repoErr: IRepoError = {
  location: 'ReceivedItemRepository.js',
  statusCode: 500,
};

const ReceivedItemRepository = {
  ...BaseRepository(db.receivedItem, repoErr),

  /**
   * This function will add multiple ReceivedItems
   * @param receivedItems - Array of ReceivedItem objects
   */
  async AddMultiple(receivedItems: IReceivedItem[]): Promise<number[]> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      // Create a new array of received items without the 'id' property
      const itemsToCreate = receivedItems.map((item) => {
        const { id, ...rest } = item; // Destructure to exclude 'id'
        return rest;
      });

      await db.receivedItem.bulkCreate(itemsToCreate, { transaction });
      await transaction.commit();
      return Promise.resolve(receivedItems.map((item) => item.id));
    } catch (err) {
      await transaction.rollback();
      // Sequelize validation errors contain a detailed `errors` array.
      // Logging this provides much more insight than the generic `err.message`.
      if (err.errors) {
        logger.warn(`Sequelize Validation Error: ${JSON.stringify(err.errors, null, 2)}`);
      }

      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  /**
   * This function will find all received items by receiving id
   * @param id
   * @returns IReceivedItem[]
   */
  async GetByReceivingId(id: number): Promise<IReceivedItem[]> {
    try {
      return await db.receivedItem.findAll({
        where: {
          receivingId: id,
        },
        include: [
          {
            model: db.product,
            required: true,
            attributes: ['productNumber', 'productType', 'brand', 'description'],
            as: 'product',
          },
        ],
      }) as IReceivedItem[];
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },
};

export default ReceivedItemRepository;
