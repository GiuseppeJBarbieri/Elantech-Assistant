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
router.get('/:productId', authenticationMiddleware, validate(InventoryValidation.GetInventory),
  (req, res, next) => {
    logger.info('GET ALL INVENTORY');
    InventoryController.GetByProductId(Number(req.params.productId))
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
    logger.info('PUT INVENTORY');
    InventoryController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will update multiple inventory
*/
router.put('/multiple', authenticationMiddleware, validate(InventoryValidation.PutMultipleInventory),
  (req, res, next) => {
    logger.info('PUT Multiple INVENTORY');

    InventoryController.EditMultiple(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will remove an inventory obj and create the removed inventory obj
*/
router.put('/removal', authenticationMiddleware, validate(InventoryValidation.DeleteInventory),
  (req, res, next) => {
    logger.info('REMOVE INVENTORY');
    const copy = req.body;
    // eslint-disable-next-line dot-notation
    copy.userId = req.session['userId'];
    // eslint-disable-next-line dot-notation
    copy.RemovedInventory.userId = req.session['userId'];
    InventoryController.Delete(copy)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
