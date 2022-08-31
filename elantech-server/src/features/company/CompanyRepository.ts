import { Op } from 'sequelize';
import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import ICompany from './ICompany';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'CompanyRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async GetByID(id: number): Promise<ICompany[]> {
    try {
      return await db.company.findAll({
        where: {
          [Op.and]: [
            {
              id,
            },
          ],
        },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Add(company): Promise<ICompany> {
    try {
      return await db.company.create(company);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async Edit(company): Promise<ICompany> {
    try {
      return await db.company.update(company, {
        where: {
          id: company.id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async DeleteByID(id: number): Promise<ICompany[]> {
    try {
      return await db.company.delete({
        where: { id },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
