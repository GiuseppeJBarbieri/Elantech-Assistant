import { Op } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IQuotedProducts from './IQuotedProducts';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'QuotedProductsRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async GetByID(id: number): Promise<IQuotedProducts[]> {
    try {
      return await db.quotedproducts.findAll({
        where: {
          [Op.and]: [
            {
              id,
            },
          ],
        },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Add(quotedproducts): Promise<IQuotedProducts> {
    try {
      return await db.quotedproducts.create(quotedproducts);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Edit(quotedproducts): Promise<IQuotedProducts> {
    try {
      return await db.quotedproducts.update(quotedproducts, {
        where: {
          id: quotedproducts.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async DeleteByID(id: number): Promise<IQuotedProducts[]> {
    try {
      return await db.quotedproducts.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
