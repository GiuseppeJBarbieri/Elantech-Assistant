import db from '../../models';
import logger from '../../utils/logging/Logger';
import IQuotedProduct from './IQuotedProduct';
import BaseRepository from '../BaseRepository';
import IRepoError from '../../utils/interfaces/IRepoError';

const repoErr: IRepoError = {
  location: 'QuotedProductRepository.js',
  statusCode: 500,
};

const QuotedProductRepository = {
  ...BaseRepository(db.quotedProduct, repoErr),

  async GetByQuoteId(quoteId: number): Promise<IQuotedProduct[]> {
    try {
      return await db.quotedProduct.findAll({
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
      }) as IQuotedProduct[];
    } catch (err) {
      logger.warn(err.message);
      throw err;
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
          product: {
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
          quote: {
            dateQuoted: element.quote.dateQuoted,
            sold: element.quote.sold,
            company: {
              name: element.quote.company.name,
              representative: element.quote.company.representative,
            },
            user: {
              firstName: element.quote.user.firstName,
              lastName: element.quote.user.lastName,
            },
          },
        };
        list.push(quoteProduct);
      });
      return list;
    } catch (err) {
      logger.warn(err.message);
      throw err;
    }
  },
};

export default QuotedProductRepository;
