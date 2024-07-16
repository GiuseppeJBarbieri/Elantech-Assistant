import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import constants from '../../utils/constants/Constants';
import IRemovedInventory from './IRemovedInventory';
import RemovedInventoryRepository from './RemovedInventoryRepository';

export default {

  async Add(inventory: IRemovedInventory): Promise<IHTTPResponse> {
    try {
      await RemovedInventoryRepository.Add(inventory);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
