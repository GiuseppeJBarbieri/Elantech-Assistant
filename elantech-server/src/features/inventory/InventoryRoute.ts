import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import InventoryController from './InventoryController';
import InventoryValidation from './InventoryValidation';

const router = express.Router();

/**
 * This route will fetch all Inventory by product number.
 */
router.get('/:productNumber',
  authenticationMiddleware, validate(InventoryValidation.GetInventory), (req, res, next) => {
    logger.info('GET ALL INVENTORY');

    InventoryController.GetByProductNumber(req.params.productNumber)
      .then((Inventory) => res.status(200).json(Inventory))
      .catch((err) => next(err));
  });

/**
 * This route will add new inventory
 */
router.post('/', validate(InventoryValidation.PostInventory),
  (req, res, next) => {
    logger.info('POST INVENTORY');
    InventoryController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will update a inventory
*/
router.put('/', authenticationMiddleware, validate(InventoryValidation.PutInventory),
  (req, res, next) => {
    logger.info('PUT PRODUCT');

    InventoryController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a product by product number
*/
router.delete('/:serialNumber',
  authenticationMiddleware,
  validate(InventoryValidation.DeleteInventory), (req, res, next) => {
    logger.info('DELETE PRODUCT');

    InventoryController.DeleteBySerialNumber(req.params.serialNumber)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
