import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IQuote from './IQuote';
import IQuotedProduct from '../quotedProducts/IQuotedProducts';

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
      return db.quote.create(quote);
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
          { model: db.user, attributes: ['firstName', 'lastName'] },
          { model: db.quoted_products },
        ],
        where: { companyId },
      });
      const quotesList: IQuote[] = [];
      responseList.forEach((response) => {
        let totalPrice = 0;
        response.quoted_products.forEach((product: IQuotedProduct) => {
          totalPrice += product.quotedPrice;
        });
        const quote: IQuote = {
          id: response.id,
          companyId: response.companyId,
          userId: response.userId,
          dateQuoted: response.dateQuoted,
          sold: response.sold,
          quoter: `${response.user.firstName} ${response.user.lastName}`,
          numberOfProducts: response.quoted_products.length,
          totalQuote: totalPrice,
        };
        quotesList.push(quote);
      });
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
