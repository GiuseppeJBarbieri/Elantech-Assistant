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
  async GetByProductNumber(productNumber: string) {
    try {
      const inventory = await InventoryRepository.GetByProductNumber(productNumber);
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
      const _inventory = { ...inventory };

      await InventoryRepository.Add(_inventory);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(inventory: IInventory): Promise<IHTTPResponse> {
    try {
      const _inventory = { ...inventory };
      await InventoryRepository.Edit(_inventory);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async DeleteBySerialNumber(serialNumber: string) {
    try {
      const affectedRowCount = await InventoryRepository.DeleteBySerialNumber(serialNumber);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
