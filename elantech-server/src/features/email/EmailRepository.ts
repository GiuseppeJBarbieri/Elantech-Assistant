import { Op } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import ITimeFrame from '../timeFrames/ITimeFrame';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'EmailRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {

  async EmailStore(storeId: number, orderDate: Date): Promise<ITimeFrame[]> {
    try {
      return await db.TimeFrames.findAll({
        where: {
          [Op.and]: [
            {
              storeId,
              orderDate,
            },
          ],
        },
        attributes: { exclude: ['storeId'] },
        include: [{
          model: db.Stores, attributes: ['storeName'],
        }],
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  // async EmailAllStores(driverId: number): Promise<IDriver> {
  //   try {
  //     return await db.Drivers.findOne({
  //       where: { driverId },
  //     });
  //   } catch (err) {
  //     standardError(err.message);
  //     return Promise.reject(repoErr);
  //   }
  // },

};
