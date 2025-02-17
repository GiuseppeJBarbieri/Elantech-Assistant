import ReceivingRepository from './ReceivingRepository';
import BaseController from '../../utils/BaseController';

const ReceivingController = {
  ...BaseController(ReceivingRepository),
};

export default ReceivingController;
