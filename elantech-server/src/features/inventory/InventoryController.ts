import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import InventoryRepository from './InventoryRepository';
import constants from '../../utils/constants/Constants';
import IInventory from './IInventory';
import BaseController from '../BaseController';

const InventoryController = {
  ...BaseController(InventoryRepository),

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
};

export default InventoryController;
