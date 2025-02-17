import RemovedInventoryRepository from './RemovedInventoryRepository';
import BaseController from '../../utils/BaseController';

const RemovedInventoryController = {
  ...BaseController(RemovedInventoryRepository),
};

export default RemovedInventoryController;
