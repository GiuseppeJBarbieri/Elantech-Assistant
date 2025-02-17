import { Transaction } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IReceiving from './IReceiving';

/// ////////////// ///
/// / INTERNALS // ///
/// ////////////// ///

const repoErr: IRepoError = {
  location: 'ReceivingRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
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
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

  async GetAllReceiving(): Promise<IReceiving[]> {
    try {
      return await db.receiving.findAll({
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
          }],
      }) as IReceiving[];
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Get(id: number): Promise<IReceiving> {
    try {
      return await db.receiving.findOne({
        where: { id },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(receiving: IReceiving): Promise<IReceiving> {
    try {
      return await db.receiving.update(receiving, {
        where: {
          id: receiving.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Delete(id: number): Promise<IReceiving[]> {
    try {
      return await db.receiving.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
