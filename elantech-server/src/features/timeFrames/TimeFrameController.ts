/* eslint-disable dot-notation */
import TimeFrameRepository from './TimeFrameRepository';
import constants from '../../utils/constants/Constants';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import ITimeFrame from './ITimeFrame';

export default {
  /**
   * This function will add the given user
   * @param user The user to add
   * @returns {PromiseLike<>}
   */

  async Add(timeFrame: ITimeFrame): Promise<IHTTPResponse> {
    try {
      let _timeFrame = { ...timeFrame };
      _timeFrame = await TimeFrameRepository.Add(_timeFrame);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: _timeFrame.orderId,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetByTimeFrameId(orderId: number) {
    try {
      const timeFrame = await TimeFrameRepository.GetById(orderId);

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [timeFrame],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetAll() {
    try {
      const timeFrames = await TimeFrameRepository.GetAllTimeFrames();
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...timeFrames],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetByDateAndDriver(driverId: number, orderDate: Date) {
    /**
     * Optimize Schema associations to avoid problems below
     * */
    try {
      const timeFrames = await TimeFrameRepository.GetByDriverIdAndDate(driverId, orderDate);
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...timeFrames],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async RemoveById(orderId: number) {
    try {
      const affectedRowCount = await TimeFrameRepository.RemoveById(orderId);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async Edit(timeFrame: ITimeFrame): Promise<IHTTPResponse> {
    try {
      let _timeFrame = { ...timeFrame };
      _timeFrame = await TimeFrameRepository.Edit(_timeFrame);

      return {
        ...constants.HTTP.SUCCESS.UPDATE,
        id: _timeFrame.orderId,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
