import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IQuote from './IQuote';

/// ////////////// ///
/// / INTERNALS // ///
/// ////////////// ///

const repoErr: IRepoError = {
  location: 'QuoteRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(quote: IQuote): Promise<IQuote> {
    try {
      logger.info(quote);
      return await db.quote.create(quote);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetAllQuotes(): Promise<IQuote[]> {
    try {
      return await db.quote.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByCompanyId(companyId: number): Promise<IQuote[]> {
    try {
      const responseList = await db.quote.findAll({
        include: [
          {
            model: db.user,
            // attributes: ['firstName', 'lastName'],
          },
        ],
        where: { companyId },
      });
      const quotesList: IQuote[] = [];
      responseList.forEach((response) => {
        const quote: IQuote = {
          id: response.id,
          companyId: response.companyId,
          userId: response.userId,
          dateQuoted: response.dateQuoted,
          sold: response.sold,
          quoter: `${response.user.firstName} ${response.user.lastName}`,
        };
        quotesList.push(quote);
      });
      logger.info('QUOTE');
      logger.info(responseList);
      return quotesList;
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Get(id: number): Promise<IQuote> {
    try {
      return await db.quote.findOne({
        where: { id },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(quote: IQuote): Promise<IQuote> {
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

  async Delete(id: number): Promise<IQuote[]> {
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
