import { Op } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import ITimeFrame from './ITimeFrame';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'TimeFrameRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(timeFrame): Promise<ITimeFrame> {
    try {
      return await db.TimeFrames.create(timeFrame);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetById(storeId: number): Promise<ITimeFrame> {
    try {
      return await db.TimeFrames.findOne({
        where: { storeId },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetAllTimeFrames(): Promise<ITimeFrame[]> {
    try {
      return await db.TimeFrames.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async RemoveById(orderId: number): Promise<ITimeFrame[]> {
    try {
      return await db.TimeFrames.destroy({
        where: { orderId },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

  async GetByDriverIdAndDate(driverId: number, orderDate: Date): Promise<ITimeFrame[]> {
    try {
      return await db.TimeFrames.findAll({
        where: {
          [Op.and]: [
            {
              driverId,
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

  async Edit(timeFrame): Promise<ITimeFrame> {
    try {
      return await db.TimeFrames.update(timeFrame, {
        where: {
          orderId: timeFrame.orderId,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

};
