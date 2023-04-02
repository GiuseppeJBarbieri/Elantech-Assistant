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
      return await db.quoted_products.create(quotedProduct);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetAllQuotes(): Promise<IQuotedProducts[]> {
    try {
      return await db.quoted_products.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByQuoteId(quoteId: number): Promise<IQuotedProducts[]> {
    try {
      return await db.quoted_products.findAll({
        where: { quoteId },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByProductId(productId: number): Promise<IQuotedProducts[]> {
    try {
      logger.info(productId);
      const response = await db.quoted_products.findAll({
        include: [
          {
            model: db.quote,
            attributes: ['dateQuoted'],
            include: [
              { model: db.company, attributes: ['companyName'] },
              { model: db.user, attributes: ['firstName'] },
            ],
          },
        ],
        where: { productId },
      });
      const quotedProducts: IQuotedProducts[] = [];
      response.forEach((quotedProduct) => {
        // Map response to quoted product format
        quotedProducts.push({
          id: quotedProduct.id,
          quoteId: quotedProduct.quoteId,
          productId: quotedProduct.productId,
          orderId: quotedProduct.orderId,
          quantity: quotedProduct.quantity,
          quotedPrice: quotedProduct.quotedPrice,
          productCondition: quotedProduct.productCondition,
          comment: quotedProduct.comment,
          companyName: quotedProduct.quote.company.companyName,
          dateQuoted: quotedProduct.quote.dateQuoted,
          quoter: quotedProduct.quote.user.firstName,
          sold: (quotedProduct.orderId !== null),
        });
      });
      return quotedProducts;
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Get(id: number): Promise<IQuotedProducts> {
    try {
      return await db.quoted_products.findOne({
        where: { id },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(quotedProduct: IQuotedProducts): Promise<IQuotedProducts> {
    try {
      return await db.quoted_products.update(quotedProduct, {
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
      return await db.quoted_products.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
