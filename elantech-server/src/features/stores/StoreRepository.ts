import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IStore from './IStore';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'StoreRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(store): Promise<IStore> {
    try {
      return await db.Stores.create(store);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetById(storeId: number): Promise<IStore> {
    try {
      return await db.Stores.findOne({
        where: { storeId },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetAllStores(): Promise<IStore[]> {
    try {
      return await db.Stores.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async RemoveById(storeId: number): Promise<IStore[]> {
    try {
      return await db.Stores.destroy({
        where: { storeId },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },
};
