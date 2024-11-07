import { Transaction } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IQuote from './IQuote';
import IQuotedProduct from '../quotedProducts/IQuotedProduct';

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
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      // Create the quote
      const createdQuote = await db.quote.create(quote, { transaction });
      // Create the quoted products using the quote ID
      const quotedProducts = quote.QuotedProducts.map((product: IQuotedProduct) => ({
        ...product,
        quoteId: createdQuote.id,
      }));
      await db.quotedProduct.bulkCreate(quotedProducts, { transaction });
      // Commit the transaction
      await transaction.commit();
      return createdQuote;
    } catch (err) {
      // Rollback the transaction in case of error
      await transaction.rollback();
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
        where: { companyId },
        include: [
          {
            model: db.quotedProduct,
            required: true,
            attributes: ['quantity', 'quotedPrice', 'productCondition', 'comment'],
            as: 'quotedProducts',
          },
          {
            model: db.user,
            attributes: ['firstName', 'lastName'],
            required: true,
            as: 'user',
          },
        ],
      });

      const list: IQuote[] = [];
      responseList.forEach((element) => {
        const tmp: IQuote = {
          id: element.id,
          companyId: element.companyId,
          userId: element.userId,
          dateQuoted: element.dateQuoted,
          sold: element.sold,
          User: element.user,
          QuotedProducts: element.quotedProducts,
        };
        list.push(tmp);
      });
      return responseList;
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
