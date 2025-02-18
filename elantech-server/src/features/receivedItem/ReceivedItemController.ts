import ReceivedItemRepository from './ReceivedItemRepository';
import BaseController from '../BaseController';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import constants from '../../utils/constants/Constants';

const ReceivedItemController = {
  ...BaseController(ReceivedItemRepository),

  async GetByReceivingId(id: number): Promise<IHTTPResponse> {
    try {
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [await ReceivedItemRepository.GetByReceivingId(id)],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default ReceivedItemController;
