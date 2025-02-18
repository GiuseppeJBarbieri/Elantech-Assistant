import BaseRoute from '../BaseRoute';
import InventoryController from './InventoryController';
import InventoryValidation from './InventoryValidation';

const router = BaseRoute(InventoryController, InventoryValidation);

/**
 * This route will get all inventory by product id
 */
router.get('/:productId', async (req, res, next) => {
  try {
    const response = await InventoryController.GetByProductId(Number(req.params.productId));
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

/**
 * This route will edit multiple inventory items
 */
router.put('/multiple', async (req, res, next) => {
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
router.put('/removal', async (req, res, next) => {
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
