import ReceivingRepository from './ReceivingRepository';
import BaseController from '../BaseController';

const ReceivingController = {
  ...BaseController(ReceivingRepository),
};

export default ReceivingController;
