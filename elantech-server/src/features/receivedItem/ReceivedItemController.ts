import ReceivedItemRepository from './ReceivedItemRepository';
import BaseController from '../BaseController';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import constants from '../../utils/constants/Constants';

const ReceivedItemController = {
  ...BaseController(ReceivedItemRepository),

  /**
   * This function will fetch a ReceivedItem by receiving id
   * @param id
   * @returns IHTTPResponse
   */
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
