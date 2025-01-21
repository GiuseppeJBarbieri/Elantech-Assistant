import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import ReceivedItemRepository from './ReceivedItemRepository';
import constants from '../../utils/constants/Constants';
import IReceivedItem from './IReceivedItem';

export default {

  async GetAll() {
    try {
      const ReceivedItem = await ReceivedItemRepository.GetAllReceiving();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...ReceivedItem],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Get(id: number): Promise<IReceivedItem> {
    try {
      const ReceivedItem: IReceivedItem = await ReceivedItemRepository.Get(id);
      if (!ReceivedItem) {
        const response = constants.HTTP.ERROR.NOT_FOUND;
        return Promise.reject(response);
      }

      return ReceivedItem;
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetByReceivingId(id: number) {
    try {
      const receivedItem = await ReceivedItemRepository.GetByReceivingId(id);
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...receivedItem],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Add(ReceivedItem: IReceivedItem): Promise<IHTTPResponse> {
    try {
      const _ReceivedItem = { ...ReceivedItem };
      const response = await ReceivedItemRepository.Add(_ReceivedItem);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: response.id,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(ReceivedItem: IReceivedItem): Promise<IHTTPResponse> {
    try {
      ReceivedItemRepository.Edit(ReceivedItem);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Delete(id: number) {
    try {
      const affectedRowCount = await ReceivedItemRepository.Delete(id);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

};
