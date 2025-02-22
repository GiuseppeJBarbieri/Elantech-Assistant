import IRepoError from '../utils/interfaces/IRepoError';
import logger from '../utils/logging/Logger';

/**
 * This is a base repository which will be extended by other repositories
 * @param dbModel - database model
 */

const BaseRepository = (dbModel: any, repoErr: IRepoError) => ({
  async Add(object: any): Promise<any> {
    try {
      return await dbModel.create(object);
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  async GetAll(): Promise<any[]> {
    try {
      return await dbModel.findAll();
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  async Get(id: number): Promise<any> {
    try {
      return await dbModel.findOne({
        where: { id },
      });
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  async Edit(object: any): Promise<any> {
    try {
      return await dbModel.update(object, {
        where: {
          id: object.id,
        },
      });
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  async Delete(id: number): Promise<void> {
    try {
      await dbModel.destroy({
        where: { id },
      });
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },
});

export default BaseRepository;
