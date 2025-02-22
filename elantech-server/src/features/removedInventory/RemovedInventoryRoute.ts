import BaseRoute from '../BaseRoute';
import RemovedInventoryController from './RemovedInventoryController';
import RemovedInventoryValidation from './RemovedInventoryValidation';

const router = BaseRoute(RemovedInventoryController, RemovedInventoryValidation, 'REMOVED INVENTORY');

export default router;
