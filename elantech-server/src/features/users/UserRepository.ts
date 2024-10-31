import sequelize from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import constants from '../../utils/constants/Constants';
import IRepoError from '../../utils/interfaces/IRepoError';
import ISession from '../session/ISession';
import IUser from './IUser';

const { Op } = sequelize;

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'UserRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(user): Promise<IUser> {
    try {
      return await db.user.create(user);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetById(id: number): Promise<IUser> {
    try {
      return await db.user.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
        include: [
          { model: db.userType, attributes: ['type'] },
        ],
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetByEmail(email: string): Promise<IUser> {
    try {
      return await db.user.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: [
          { model: db.userType, attributes: ['type'] },
        ],
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Update(user): Promise<number[]> {
    try {
      const affectedRows = await db.user.update(user,
        {
          where: { id: user.id },
        });

      if (affectedRows[0] > 0) {
        return affectedRows[0];
      }
      standardError(constants.HTTP.ERROR.NOT_FOUND.message);
      return Promise.reject(repoErr);
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Login(email: string): Promise<IUser> {
    try {
      const users = await db.user.findAll({
        where: sequelize.where(sequelize.fn('lower', sequelize.col('email')), sequelize.fn('lower', email)),
        include: [
          { model: db.userType, attributes: ['type'] },
        ],
      });

      if (users.length > 0) {
        return users[0];
      }
      logger.warn(constants.HTTP.ERROR.NOT_FOUND);
      return Promise.reject(constants.HTTP.ERROR.NOT_FOUND);
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Logout(uuid: string): Promise<ISession> {
    try {
      const result = db.session.destroy({
        where: {
          uuid,
        },
      });

      return Promise.resolve(result);
    } catch (err) {
      standardError(err);
      logger.info(err);
      return Promise.reject(repoErr);
    }
  },

  async GetSession(uuid: string): Promise<ISession> {
    try {
      return await db.session.findOne({
        where: {
          uuid,
          active: true,
          expired: false,
        },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async UpdateSession(session): Promise<ISession> {
    try {
      const affectedRows = await db.session.update(session, {
        where: {
          uuid: session.uuid,
        },
      });

      if (affectedRows[0] > 0) {
        return Promise.resolve(affectedRows[0]);
      }

      standardError(constants.HTTP.ERROR.NOT_FOUND.message);
      return Promise.reject(repoErr);
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async NewSession(session: ISession): Promise<ISession> {
    try {
      return await db.session.create(session);
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  /**
   * Deletes all sessions that are inactive active a given number of milliseconds
   * @param cutoffDate is the date object for the latest date to keep results
   */
  async ClearStaleSessions(cutoffDate: Date): Promise<any[]> {
    try {
      const result = db.session.destroy({
        where: {
          expiresAt: {
            [Op.lt]: cutoffDate,
          },
        },
      });

      return Promise.resolve(result);
    } catch (err) {
      standardError(err);
      logger.info(err);
      return Promise.reject(repoErr);
    }
  },
};
