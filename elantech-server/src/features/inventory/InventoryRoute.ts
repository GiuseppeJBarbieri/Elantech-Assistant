import logger from '../../utils/logging/Logger';
import BaseRoute from '../BaseRoute';
import InventoryController from './InventoryController';
import InventoryValidation from './InventoryValidation';
import authenticationMiddleware from '../../middleware/Auth';
import validate from '../../middleware/JoiValidator';
import IInventory from './IInventory';

const TAG = 'INVENTORY';

const router = BaseRoute(InventoryController, InventoryValidation, TAG);

// Override the DELETE route
router.stack = router.stack.filter((layer) => !(layer.route
  && layer.route.path === '/:id'
  && layer.route.methods.delete
));

/**
 * This route will get all inventory by product id
 * @route GET /product/{id}
 * @group Inventory Table
 * @param {number} id.path.required - Product id
 * @returns {Array.<IInventory>} 201 - An array of inventory
 * @returns {Error}  default - Unexpected error
 */
router.get('/product/:id',
  authenticationMiddleware,
  validate(InventoryValidation.Get),
  async (req, res, next) => {
    logger.info(`GET ${TAG} BY PRODUCT ID`);

    InventoryController.GetByProductId(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will add multiple inventory items
* @route POST /multiple
* @group Inventory Table
* @param {Array.<IInventory>} body.body.required - Inventory object
* @returns {Array.<IInventory>} 201 - An array of inventory
* @returns {Error}  default - Unexpected error
*/
router.post('/multiple',
  authenticationMiddleware,
  validate(InventoryValidation.PostMultiple),
  async (req, res, next) => {
    logger.info(`POST MULTIPLE ${TAG}`);

    InventoryController.AddMultiple(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will edit multiple inventory items
 * @route PUT /multiple
 * @group Inventory Table
 * @param {Array.<IInventory>} body.body.required - Inventory object
 * @returns {Array.<IInventory>} 201 - An array of inventory
 * @returns {Error}  default - Unexpected error
 */
router.put('/multiple',
  authenticationMiddleware,
  validate(InventoryValidation.PutMultiple),
  async (req, res, next) => {
    logger.info(`PUT MULTIPLE ${TAG}`);

    InventoryController.EditMultiple(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will soft remove inventory
 * @route DELETE /removal
 * @group Inventory Table
 * @param {number} id.body.required - Inventory id
 * @returns {IInventory} 201 - Inventory object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/',
  authenticationMiddleware,
  validate(InventoryValidation.Delete),
  async (req, res, next) => {
    logger.info(`DELETE ${TAG}`);

    const tempArr: IInventory[] = [];
    (req.body as IInventory[]).forEach((inventory: IInventory) => {
      const inv: IInventory = {
        ...inventory,
        removedInventory: { ...inventory.removedInventory, userId: req.session['userId'] },
      };
      tempArr.push(inv);
    });

    InventoryController.Delete(tempArr)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
