import { Transaction } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IQuote from './IQuote';
import IQuotedProduct from '../quotedProducts/IQuotedProduct';
import BaseRepository from '../BaseRepository';
import IRepoError from '../../utils/interfaces/IRepoError';

const repoErr: IRepoError = {
  location: 'QuoteRepository.js',
  statusCode: 500,
};

const QuoteRepository = {
  ...BaseRepository(db.quote, repoErr),

  async Add(quote: IQuote): Promise<IQuote> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      // Create the quote
      const createdQuote = await db.quote.create(quote, { transaction });
      // Create the quoted products using the quote ID
      const quotedProducts = quote.quotedProducts.map((product: IQuotedProduct) => ({
        ...product,
        quoteId: createdQuote.id,
      }));

      if (quotedProducts.length === 1) {
        await db.quotedProduct.create(quotedProducts[0], { transaction });
      } else {
        await db.quotedProduct.bulkCreate(quotedProducts, { transaction });
      }
      // Commit the transaction
      await transaction.commit();
      return createdQuote;
    } catch (err) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      logger.warn(err.message);
      throw err;
    }
  },

  async GetByCompanyId(companyId: number): Promise<IQuote[]> {
    try {
      return await db.quote.findAll({
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
      }) as IQuote[];
    } catch (err) {
      logger.warn(err.message);
      throw err;
    }
  },

  async Delete(id: number): Promise<IQuote[]> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      const existingQuotedProducts = await db.quotedProduct.findAll({
        where: {
          quoteId: id,
        },
      });

      // Create a map of existing products by ID for quick lookup
      const existingQuotedProductsMap = new Map(
        existingQuotedProducts.map((quotedProduct: IQuotedProduct) => [quotedProduct.id, quotedProduct]),
      );

      // Delete related quoted products
      existingQuotedProductsMap.forEach(async (quotedProduct: IQuotedProduct) => {
        await db.quotedProduct.destroy({
          where: { id: quotedProduct.id },
          transaction,
        });
      });

      const response = await db.quote.destroy({
        where: {
          id,
        },
        transaction,
      });

      // Commit the transaction
      await transaction.commit();
      return response;
    } catch (err) {
      await transaction.rollback();
      logger.warn(err.message);
      throw err;
    }
  },

  async UpdateQuotedProducts(quote: IQuote): Promise<void> {
    const transaction: Transaction = await db.sequelize.transaction();
    try {
      // Fetch existing quoted products
      const existingQuotedProducts = await db.quotedProduct.findAll({
        where: {
          quoteId: quote.id,
        },
      }, transaction);

      // Create a map of existing products by ID for quick lookup
      const existingQuotedProductsMap = new Map();
      existingQuotedProducts.forEach((element) => {
        existingQuotedProductsMap.set(element.dataValues.id, element.dataValues);
      });

      // Iterate over the provided quoted products list
      quote.quotedProducts.forEach(async (product: IQuotedProduct) => {
        if (product.id && existingQuotedProductsMap.has(product.id)) {
          // Update existing product
          await db.quotedProduct.update(product,
            {
              where: { id: product.id },
            }, transaction);
        } else {
          // Create new product
          // eslint-disable-next-line no-param-reassign
          delete product.id;
          await db.quotedProduct.create(product, transaction);
        }
      });
      // Delete remaining products that were not in the provided list
      existingQuotedProductsMap.forEach(async (product: IQuotedProduct) => {
        if (product.id && !quote.quotedProducts.find((p) => p.id === product.id)) {
          await db.quotedProduct.destroy({
            where: { id: product.id },
          }, transaction);
        }
      });
      // Commit the transaction
      await transaction.commit();
    } catch (err) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      logger.warn(err.message);
      throw err;
    }
  },
};

export default QuoteRepository;
