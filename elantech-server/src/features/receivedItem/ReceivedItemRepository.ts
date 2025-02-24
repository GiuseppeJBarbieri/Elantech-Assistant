import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IReceivedItem from './IReceivedItem';
import BaseRepository from '../BaseRepository';

const repoErr: IRepoError = {
  location: 'ReceivedItemRepository.js',
  statusCode: 500,
};

const ReceivedItemRepository = {
  ...BaseRepository(db.receivedItem, repoErr),

  /**
   * This function will find all received items by receiving id
   * @param id
   * @returns IReceivedItem[]
   */
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
