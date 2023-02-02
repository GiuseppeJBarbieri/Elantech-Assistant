import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import ICompany from './ICompany';

/// ////////////// ///
/// / INTERNALS // ///
/// ////////////// ///

const repoErr: IRepoError = {
  location: 'CompanyRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  async Add(company: ICompany): Promise<ICompany> {
    try {
      return await db.company.create(company);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetAllCompanies(): Promise<ICompany[]> {
    try {
      return await db.company.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Get(id: number): Promise<ICompany> {
    try {
      return await db.company.findOne({
        where: { id },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async Edit(company: ICompany): Promise<ICompany> {
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

  async Delete(id: number): Promise<ICompany[]> {
    try {
      return await db.company.destroy({
        where: {
          id,
        },
      });
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      return Promise.reject(repoErr);
    }
  },

};
