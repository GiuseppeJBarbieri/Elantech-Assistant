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
      return db.ReceivedItem.create(ReceivedItem);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetAllReceiving(): Promise<IReceivedItem[]> {
    try {
      return await db.ReceivedItem.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Get(id: number): Promise<IReceivedItem> {
    try {
      return await db.ReceivedItem.findOne({
        where: { id },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(ReceivedItem: IReceivedItem): Promise<IReceivedItem> {
    try {
      return await db.ReceivedItem.update(ReceivedItem, {
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
      return await db.ReceivedItem.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
