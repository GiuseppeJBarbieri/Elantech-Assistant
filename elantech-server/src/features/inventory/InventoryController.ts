import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import InventoryRepository from './InventoryRepository';
import constants from '../../utils/constants/Constants';
import IInventory from './IInventory';

export default {

  /**
   * This function will fetch the user with the given productNumber
   * @param productNumber The id of the user to fetch
   * @returns JSON user
   */
  async GetByProductId(productId: number) {
    try {
      const inventory = await InventoryRepository.GetByProductId(productId);
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...inventory],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(inventory: IInventory): Promise<IHTTPResponse> {
    try {
      await InventoryRepository.Add(inventory);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(inventory: IInventory): Promise<IHTTPResponse> {
    try {
      await InventoryRepository.Edit(inventory);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Delete(inventory: IInventory) {
    try {
      await InventoryRepository.Delete(inventory);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
