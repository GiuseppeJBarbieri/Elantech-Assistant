import { Transaction, Sequelize } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IReceiving from './IReceiving';
import BaseRepository from '../BaseRepository';

/// ////////////// ///
/// / INTERNALS // ///
/// ////////////// ///

const repoErr: IRepoError = {
  location: 'ReceivingRepository.js',
  statusCode: 500,
};

const ReceivingRepository = {
  ...BaseRepository(db.receiving, repoErr),

  async Add(receiving: IReceiving): Promise<IReceiving> {
    let transaction: Transaction;
    try {
      transaction = await db.sequelize.transaction();

      // Create "Receiving" object
      const receivingPayload = { ...receiving };
      delete receivingPayload.receivedItems;
      const createdReceivingObj = await db.receiving.create(receivingPayload, { transaction });

      // Create "ReceivedItem" objects
      const receivedItems = [...receiving.receivedItems];
      await Promise.all(receivedItems.map(async (receivedItem) => {
        const _receivedItemPayload = { ...receivedItem };

        // Link current ReceivedItem to the newly created "Receiving" object
        _receivedItemPayload.receivingId = createdReceivingObj.id;

        await db.receivedItem.create(_receivedItemPayload, { transaction });
      })).catch((err) => {
        throw new Error(err);
      });

      await transaction.commit();
      return createdReceivingObj;
    } catch (err) {
      // Rollback the transaction in case of error
      await transaction.rollback();

      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  async GetAll(): Promise<IReceiving[]> {
    try {
      // This subquery will ensure that we only return `receiving` records
      // where there are no associated `receivedItem` records having `finishedAdding` as false.
      // This effectively means all `receivedItems` for a `receiving` must have `finishedAdding: true`.
      // It also correctly handles cases where a `receiving` has no `receivedItems`.
      return await db.receiving.findAll({
        attributes: {
          include: [
            [
              Sequelize.literal(`(
            NOT EXISTS (
            SELECT 1
            FROM "receivedItems" AS "item"
            WHERE
              "item"."finishedAdding" = false
              AND "item"."receivingId" = "receiving"."id"
          )
        )`),
              'completed',
            ],
          ],
        },
        include: [
          {
            model: db.company,
            attributes: ['name'],
            required: false,
            as: 'company',
          },
          {
            model: db.user,
            attributes: ['firstName', 'lastName'],
            required: false,
            as: 'user',
          },
        ],
      }) as IReceiving[];
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  async Delete(id: number): Promise<number> {
    let transaction: Transaction;

    try {
      transaction = await db.sequelize.transaction();

      const deletedOrders = await db.receivedItem.destroy({
        where: { receivingId: id }, transaction,
      });

      const deletedOrderItems = await db.receiving.destroy({
        where: { id }, transaction,
      });

      await transaction.commit();

      return deletedOrders + deletedOrderItems;
    } catch (err) {
      // Rollback the transaction in case of error
      await transaction.rollback();

      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },
};

export default ReceivingRepository;
