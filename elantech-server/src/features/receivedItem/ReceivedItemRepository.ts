import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IReceivedItem from './IReceivedItem';

/// ////////////// ///
/// / INTERNALS // ///
/// ////////////// ///

const repoErr: IRepoError = {
  location: 'ReceivedItemRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(ReceivedItem: IReceivedItem): Promise<IReceivedItem> {
    try {
      return db.receivedItem.create(ReceivedItem);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetAllReceiving(): Promise<IReceivedItem[]> {
    try {
      return await db.receivedItem.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Get(id: number): Promise<IReceivedItem> {
    try {
      return await db.receivedItem.findOne({
        where: { id },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByReceivingId(id: number): Promise<IReceivedItem[]> {
    try {
      const list = await db.receivedItem.findAll({
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
      });

      return list;
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(ReceivedItem: IReceivedItem): Promise<IReceivedItem> {
    try {
      return await db.receivedItem.update(ReceivedItem, {
        where: {
          id: ReceivedItem.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Delete(id: number): Promise<IReceivedItem[]> {
    try {
      return await db.receivedItem.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
