import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IQuotedProduct from './IQuotedProduct';

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
  async Add(quotedProduct: IQuotedProduct): Promise<IQuotedProduct> {
    try {
      return await db.quotedProduct.create(quotedProduct);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetAllQuotes(): Promise<IQuotedProduct[]> {
    try {
      return await db.quotedProduct.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByQuoteId(quoteId: number): Promise<IQuotedProduct[]> {
    try {
      const qp = await db.quotedProduct.findAll({
        where: { quoteId },
        include: [
          {
            model: db.product,
            attributes: [
              'productNumber',
              'productType',
              'brand',
              'description',
              'altNumber1',
              'altNumber2',
              'altNumber3',
              'altNumber4',
              'altNumber5',
              'altNumber6',
              'ebayUrl',
              'websiteUrl',
              'quickSpecsUrl',
            ],
          },
          {
            model: db.quote,
            attributes: ['dateQuoted', 'sold'],
            include: [
              {
                model: db.company,
                attributes: ['name', 'representative'],
                required: true,
                as: 'company',
              },
              {
                model: db.user,
                attributes: ['firstName', 'lastName'],
                required: true,
                as: 'user',
              },
            ],
          },
        ],
      });

      const list: IQuotedProduct[] = [];

      qp.forEach((element) => {
        const quoteProduct: IQuotedProduct = {
          id: element.id,
          quoteId: element.quoteId,
          productId: element.productId,
          quantity: element.quantity,
          quotedPrice: element.quotedPrice,
          productCondition: element.productCondition,
          comment: element.comment,
          Product: {
            productNumber: element.product.productNumber,
            productType: element.product.productType,
            brand: element.product.brand,
            description: element.product.description,
            altNumber1: element.product.altNumber1,
            altNumber2: element.product.altNumber2,
            altNumber3: element.product.altNumber3,
            altNumber4: element.product.altNumber4,
            altNumber5: element.product.altNumber5,
            altNumber6: element.product.altNumber6,
            ebayUrl: element.product.ebayUrl,
            websiteUrl: element.product.websiteUrl,
            quickSpecsUrl: element.product.quickSpecsUrl,
          },
          Quote: {
            dateQuoted: element.quote.dateQuoted,
            sold: element.quote.sold,
            Company: {
              name: element.quote.company.name,
              representative: element.quote.company.representative,
            },
            User: {
              firstName: element.quote.user.firstName,
              lastName: element.quote.user.lastName,
            },
          },
        };
        list.push(quoteProduct);
      });
      return list;
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByProductId(productId: number): Promise<IQuotedProduct[]> {
    try {
      const qp = await db.quotedProduct.findAll({
        where: { productId },
        include: [
          {
            model: db.product,
            attributes: [
              'productNumber',
              'productType',
              'brand',
              'description',
              'altNumber1',
              'altNumber2',
              'altNumber3',
              'altNumber4',
              'altNumber5',
              'altNumber6',
              'ebayUrl',
              'websiteUrl',
              'quickSpecsUrl',
            ],
          },
          {
            model: db.quote,
            attributes: ['dateQuoted', 'sold'],
            include: [
              {
                model: db.company,
                attributes: ['name', 'representative'],
                required: true,
                as: 'company',
              },
              {
                model: db.user,
                attributes: ['firstName', 'lastName'],
                required: true,
                as: 'user',
              },
            ],
          },
        ],
      });

      const list: IQuotedProduct[] = [];

      qp.forEach((element) => {
        const quoteProduct: IQuotedProduct = {
          id: element.id,
          quoteId: element.quoteId,
          productId: element.productId,
          quantity: element.quantity,
          quotedPrice: element.quotedPrice,
          productCondition: element.productCondition,
          comment: element.comment,
          Product: {
            productNumber: element.product.productNumber,
            productType: element.product.productType,
            brand: element.product.brand,
            description: element.product.description,
            altNumber1: element.product.altNumber1,
            altNumber2: element.product.altNumber2,
            altNumber3: element.product.altNumber3,
            altNumber4: element.product.altNumber4,
            altNumber5: element.product.altNumber5,
            altNumber6: element.product.altNumber6,
            ebayUrl: element.product.ebayUrl,
            websiteUrl: element.product.websiteUrl,
            quickSpecsUrl: element.product.quickSpecsUrl,
          },
          Quote: {
            dateQuoted: element.quote.dateQuoted,
            sold: element.quote.sold,
            Company: {
              name: element.quote.company.name,
              representative: element.quote.company.representative,
            },
            User: {
              firstName: element.quote.user.firstName,
              lastName: element.quote.user.lastName,
            },
          },
        };
        list.push(quoteProduct);
      });
      return list;
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Get(id: number): Promise<IQuotedProduct> {
    try {
      return await db.quotedProduct.findOne({
        where: { id },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(quotedProduct: IQuotedProduct): Promise<IQuotedProduct> {
    try {
      return await db.quotedProduct.update(quotedProduct, {
        where: {
          id: quotedProduct.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Delete(id: number): Promise<IQuotedProduct[]> {
    try {
      return await db.quotedProduct.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
