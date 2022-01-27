import StoreRepository from './StoreRepository';
import constants from '../../utils/constants/Constants';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import IStore from './IStore';

export default {
  /**
   * This function will add the given user
   * @param user The user to add
   * @returns {PromiseLike<>}
   */
  async Add(store: IStore): Promise<IHTTPResponse> {
    try {
      let _store = { ...store };
      _store = await StoreRepository.Add(_store);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: _store.storeId,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetById(storeId: number) {
    try {
      const store = await StoreRepository.GetById(storeId);

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [store],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetAll() {
    try {
      const stores = await StoreRepository.GetAllStores();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...stores],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async RemoveById(storeId: number) {
    try {
      const affectedRowCount = await StoreRepository.RemoveById(storeId);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
