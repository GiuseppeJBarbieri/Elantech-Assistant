import DriverRepository from './DriverRepository';
import constants from '../../utils/constants/Constants';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import IDriver from './IDriver';

export default {

  /**
   * This function will add the given user
   * @param user The user to add
   * @returns {PromiseLike<>}
   */
  async Add(driver: IDriver): Promise<IHTTPResponse> {
    try {
      let _driver = { ...driver };
      _driver = await DriverRepository.Add(_driver);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: _driver.driverId,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetById(driverId: number) {
    try {
      const driver = await DriverRepository.GetById(driverId);

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [driver],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetAll() {
    try {
      const drivers = await DriverRepository.GetAllDrivers();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...drivers],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async RemoveById(driverId: number) {
    try {
      const affectedRowCount = await DriverRepository.RemoveById(driverId);
      return {
        ...constants.HTTP.SUCCESS.DELETE,
        payload: affectedRowCount,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
