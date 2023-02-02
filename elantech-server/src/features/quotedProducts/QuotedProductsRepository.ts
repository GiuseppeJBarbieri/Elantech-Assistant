import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IQuotedProducts from './IQuotedProducts';

/// ////////////// ///
/// / INTERNALS // ///
/// ////////////// ///

const repoErr: IRepoError = {
  location: 'QuotedProductRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(quotedProduct: IQuotedProducts): Promise<IQuotedProducts> {
    try {
      return await db.quotedProducts.create(quotedProduct);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetAllQuotes(): Promise<IQuotedProducts[]> {
    try {
      return await db.quotedProducts.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByQuoteId(quoteID: number): Promise<IQuotedProducts[]> {
    try {
      return await db.quotedProducts.findAll({
        where: { quoteID },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByProductId(productID: number): Promise<any> {
    try {
      return await db.quotedProducts.findAll({
        where: { productID },
        include: [
          { model: db.quotedProducts, attributes: ['id', 'quantity', 'quotedPrice', 'comments', 'orderId'] },
          { model: db.company, attributes: ['companyName'] },
          { model: db.quote, attributes: ['dateQuoted'] },
          { model: db.users, attributes: ['firstName'] },
        ],
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Get(id: number): Promise<IQuotedProducts> {
    try {
      return await db.quotedProducts.findOne({
        where: { id },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(quotedProduct: IQuotedProducts): Promise<IQuotedProducts> {
    try {
      return await db.quotedProducts.update(quotedProduct, {
        where: {
          id: quotedProduct.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Delete(id: number): Promise<IQuotedProducts[]> {
    try {
      return await db.quotedProducts.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
