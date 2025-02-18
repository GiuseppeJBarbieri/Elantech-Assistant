import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import ReceivingRepository from './ReceivingRepository';
import constants from '../../utils/constants/Constants';
import IReceiving from './IReceiving';

export default {

  async GetAll() {
    try {
      const receivingOrders = await ReceivingRepository.GetAllReceiving();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...receivingOrders],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Get(id: number): Promise<IReceiving> {
    try {
      const receiving: IReceiving = await ReceivingRepository.Get(id);
      if (!receiving) {
        const response = constants.HTTP.ERROR.NOT_FOUND;
        return Promise.reject(response);
      }

      return receiving;
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(receiving: IReceiving): Promise<IHTTPResponse> {
    try {
      const _receiving = { ...receiving };
      const response = await ReceivingRepository.Add(_receiving);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: response.id,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(receiving: IReceiving): Promise<IHTTPResponse> {
    try {
      const editedItemId = await ReceivingRepository.Edit(receiving);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
        id: editedItemId,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Delete(id: number) {
    try {
      const affectedRowCount = await ReceivingRepository.Delete(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
