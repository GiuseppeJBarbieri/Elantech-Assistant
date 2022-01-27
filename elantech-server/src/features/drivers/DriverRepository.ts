import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import IDriver from './IDriver';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'DriverRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(driver): Promise<IDriver> {
    try {
      return await db.Drivers.create(driver);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetById(driverId: number): Promise<IDriver> {
    try {
      return await db.Drivers.findOne({
        where: { driverId },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetAllDrivers(): Promise<IDriver[]> {
    try {
      return await db.Drivers.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async RemoveById(driverId: number): Promise<IDriver[]> {
    try {
      return await db.Drivers.destroy({
        where: { driverId },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },
};
