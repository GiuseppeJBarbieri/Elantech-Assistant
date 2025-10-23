import IRepoError from '../utils/interfaces/IRepoError';
import logger from '../utils/logging/Logger';
import EventBus from '../utils/EventBus';

/**
 * This is a base repository which will be extended by other repositories
 * @param dbModel - database model
 */
const BaseRepository = (dbModel: any, repoErr: IRepoError, entityName?: string) => ({
  /**
   * This function will add new record
   * @param object
   * @returns <Promise<any>>
   */
  async Add(object: any): Promise<any> {
    try {
      const result = await dbModel.create(object);

      // Emit event after successful creation
      if (entityName) {
        EventBus.emit(`${entityName}.updated`, {
          action: 'create',
          ids: [result.id],
          timestamp: Date.now(),
          data: result,
        });
      }

      return result;
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  /**
   * This function will return all records
   * @returns <Promise<any[]>>
   */
  async GetAll(): Promise<any[]> {
    try {
      return await dbModel.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  /**
   * This function will return record by id
   * @param id
   * @returns <Promise<any>>
   */
  async Get(id: number): Promise<any> {
    try {
      return await dbModel.findOne({
        where: { id },
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  /**
   * This function will edit a record
   * @param object
   * @returns <Promise<any>>
   */
  async Edit(object: any): Promise<any> {
    try {
      const result = await dbModel.update(object, {
        where: {
          id: object.id,
        },
      });

      // Emit event after successful update
      if (entityName && result[0] > 0) { // result[0] is the number of affected rows
        EventBus.emit(`${entityName}.updated`, {
          action: 'update',
          ids: [object.id],
          timestamp: Date.now(),
          data: object,
        });
      }

      return result;
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },

  /**
   * This function will delete a record by it's id
   * @param id
   * @returns <Promise<void>>
   */
  async Delete(id: number): Promise<void> {
    try {
      await dbModel.destroy({
        where: { id },
      });

      // Emit event after successful deletion
      if (entityName) {
        EventBus.emit(`${entityName}.updated`, {
          action: 'delete',
          ids: [id],
          timestamp: Date.now(),
        });
      }
    } catch (err) {
      const repoError = { ...repoErr, message: err.message };
      logger.warn(repoError);
      throw repoError;
    }
  },
});

export default BaseRepository;
