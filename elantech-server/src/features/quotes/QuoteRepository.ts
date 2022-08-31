import { Op } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IQuote from './IQuote';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'QuoteRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async GetByID(id: number): Promise<IQuote[]> {
    try {
      return await db.quote.findAll({
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

  async Add(quote): Promise<IQuote> {
    try {
      return await db.quote.create(quote);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Edit(quote): Promise<IQuote> {
    try {
      return await db.quote.update(quote, {
        where: {
          id: quote.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async DeleteByID(id: number): Promise<IQuote[]> {
    try {
      return await db.quote.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
