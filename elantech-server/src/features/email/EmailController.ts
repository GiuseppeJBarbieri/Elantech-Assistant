import EmailRepository from './EmailRepository';
import constants from '../../utils/constants/Constants';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import { emailStore } from '../../utils/smtp/EmailHelper';

export default {

  /**
   * This function will add the given user
   * @param user The user to add
   * @returns {PromiseLike<>}
   */
  async EmailStore(storeId: number, orderDate: Date): Promise<IHTTPResponse> {
    try {
      // const timeFrames = await EmailRepository.EmailStore(storeId, orderDate);
      // return {
      //   ...constants.HTTP.SUCCESS.SELECTED,
      //   payload: [...timeFrames],
      // };
      await emailStore();
      return { ...constants.HTTP.SUCCESS.SELECTED };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  // async EmailAllStores() {
  //   try {
  //     const driver = await EmailRepository.GetById(driverId);

  //     return {
  //       ...constants.HTTP.SUCCESS.SELECTED,
  //       payload: [driver],
  //     };
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // },

};
