import logger from '../../utils/logging/Logger';
import BaseRoute from '../BaseRoute';
import InventoryController from './InventoryController';
import InventoryValidation from './InventoryValidation';
import authenticationMiddleware from '../../middleware/Auth';
import validate from '../../middleware/JoiValidator';

const router = BaseRoute(InventoryController, InventoryValidation, 'INVENTORY');

/**
 * This route will get all inventory by product id
 */
router.get('/product/:id',
  authenticationMiddleware,
  validate(InventoryValidation.Get),
  async (req, res, next) => {
    logger.info('GET INVENTORY BY PRODUCT ID');
    try {
      const response = await InventoryController.GetByProductId(Number(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

/**
* This route will add new record
*/
router.post('/multiple',
  authenticationMiddleware,
  validate(InventoryValidation.PostMultiple), async (req, res, next) => {
    logger.info('POST MULTIPLE INVENTORY');
    try {
      const response = await InventoryController.AddMultiple(req.body);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

/**
 * This route will edit multiple inventory items
 */
router.put('/multiple', authenticationMiddleware,
  validate(InventoryValidation.PutMultiple), async (req, res, next) => {
    logger.info('PUT MULTIPLE INVENTORY');
    try {
      const response = await InventoryController.EditMultiple(req.body);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

/**
 * This route will soft remove inventory
 */
router.put('/removal', authenticationMiddleware,
  validate(InventoryValidation.Delete), async (req, res, next) => {
    logger.info('DELETE INVENTORY');
    try {
      const copy = req.body;
      // eslint-disable-next-line dot-notation
      copy.userId = req.session['userId'];
      // eslint-disable-next-line dot-notation
      copy.RemovedInventory.userId = req.session['userId'];
      const response = await InventoryController.Delete(copy);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

export default router;
