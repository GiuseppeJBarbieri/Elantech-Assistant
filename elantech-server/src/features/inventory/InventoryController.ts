import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import InventoryRepository from './InventoryRepository';
import constants from '../../utils/constants/Constants';
import IInventory from './IInventory';
import BaseController from '../BaseController';

const InventoryController = {
  ...BaseController(InventoryRepository),

  /**
   * This function will find one inventory by it's product id
   * @param productId
   * @returns IHTTPResponse
   */
  async GetByProductId(productId: number): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await InventoryRepository.GetByProductId(productId)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
   * This function will add multiple inventory
   * @param inventory
   * @returns IHTTPResponse
   */
  async AddMultiple(inventory: IInventory[]): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await InventoryRepository.AddMultiple(inventory)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
   * This function will edit multiple inventory
   * @param inventory
   * @returns IHTTPResponse
   */
  async EditMultiple(inventory: IInventory[]): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.UPDATE,
        payload: [await InventoryRepository.EditMultiple(inventory)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
  * This function will edit multiple inventory
  * @param inventory
  * @returns IHTTPResponse
  */
  async Delete(inventory: IInventory[]): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: [await InventoryRepository.Delete(inventory)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default InventoryController;
