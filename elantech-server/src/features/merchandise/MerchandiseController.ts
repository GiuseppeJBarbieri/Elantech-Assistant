import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import MerchandiseRepository from './MerchandiseRepository';
import constants from '../../utils/constants/Constants';
import IMerchandise from './IMerchandise';

export default {

  async GetAll() {
    try {
      const merchandise = await MerchandiseRepository.GetAllReceiving();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...merchandise],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Get(id: number): Promise<IMerchandise> {
    try {
      const merchandise: IMerchandise = await MerchandiseRepository.Get(id);
      if (!merchandise) {
        const response = constants.HTTP.ERROR.NOT_FOUND;
        return Promise.reject(response);
      }

      return merchandise;
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(merchandise: IMerchandise): Promise<IHTTPResponse> {
    try {
      const _merchandise = { ...merchandise };
      const response = await MerchandiseRepository.Add(_merchandise);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: response.id,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(merchandise: IMerchandise): Promise<IHTTPResponse> {
    try {
      MerchandiseRepository.Edit(merchandise);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Delete(id: number) {
    try {
      const affectedRowCount = await MerchandiseRepository.Delete(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
