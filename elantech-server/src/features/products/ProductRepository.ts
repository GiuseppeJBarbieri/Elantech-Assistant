import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IProduct from './IProduct';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'DriverRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async GetAllProducts(): Promise<IProduct[]> {
    try {
      return await db.Products.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },
};
