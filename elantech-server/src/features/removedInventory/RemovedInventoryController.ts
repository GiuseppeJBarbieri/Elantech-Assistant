import RemovedInventoryRepository from './RemovedInventoryRepository';
import BaseController from '../BaseController';

const RemovedInventoryController = {
  ...BaseController(RemovedInventoryRepository),
};

export default RemovedInventoryController;
