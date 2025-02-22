import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IReceivedItem from './IReceivedItem';
import BaseRepository from '../BaseRepository';

/// ////////////// ///
/// / INTERNALS // ///
/// ////////////// ///

const repoErr: IRepoError = {
  location: 'ReceivedItemRepository.js',
  statusCode: 500,
};

/**
 * @deprecated
 */
const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

const ReceivedItemRepository = {
  ...BaseRepository(db.receivedItem, repoErr),

  async GetByReceivingId(id: number): Promise<IReceivedItem[]> {
    try {
      return await db.receivedItem.findAll({
        where: {
          receivingId: id,
        },
        include: [
          {
            model: db.product,
            required: true,
            attributes: ['productNumber', 'productType', 'brand', 'description'],
            as: 'product',
          },
        ],
      }) as IReceivedItem[];
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },
};

export default ReceivedItemRepository;
