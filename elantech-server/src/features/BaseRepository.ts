import logger from '../utils/logging/Logger';

/**
 * This is a base repository which will be extended by other repositories
 * @param dbModel - database model
 */
const BaseRepository = (dbModel: any) => ({
  async Add(object: any): Promise<any> {
    try {
      return await dbModel.create(object);
    } catch (err) {
      logger.warn(err.message);
      throw err;
    }
  },

  async GetAll(): Promise<any[]> {
    try {
      return await dbModel.findAll();
    } catch (err) {
      logger.warn(err.message);
      throw err;
    }
  },

  async Get(id: number): Promise<any> {
    try {
      return await dbModel.findOne({
        where: { id },
      });
    } catch (err) {
      logger.warn(err.message);
      throw err;
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
      logger.warn(err.message);
      throw err;
    }
  },

  async Delete(id: number): Promise<void> {
    try {
      await dbModel.destroy({
        where: { id },
      });
    } catch (err) {
      logger.warn(err.message);
      throw err;
    }
  },
});

export default BaseRepository;
