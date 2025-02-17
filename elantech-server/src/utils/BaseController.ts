import IHTTPResponse from './interfaces/IHTTPResponse';
import constants from './constants/Constants';

const BaseController = (repository: any) => ({
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
