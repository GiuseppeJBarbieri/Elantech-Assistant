import IHTTPResponse from '../utils/interfaces/IHTTPResponse';
import constants from '../utils/constants/Constants';

/**
 * This is a base controller which will be extended by other controllers
 * @param repository
 * @returns IHTTPResponse
 */
const BaseController = (repository: any) => ({
  /**
   * This function will get all records
   * @returns IHTTPResponse
   */
  async GetAll(): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await repository.GetAll()],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
   * This function will get one record by its id
   * @param id
   * @returns IHTTPResponse
   */
  async Get(id: number): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await repository.Get(id)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
   * This function will add new records
   * @param item
   * @returns IHTTPResponse
   */
  async Add(item: any): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.CREATED,
        payload: [await repository.Add(item)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
   * This function will edit a record
   * @param item
   * @returns IHTTPResponse
   */
  async Edit(item: any): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.UPDATE,
        payload: [await repository.Edit(item)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
   * This function will delete a record by its id
   * @param id
   * @returns IHTTPResponse
   */
  async Delete(id: number): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: [await repository.Delete(id)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
});

export default BaseController;
