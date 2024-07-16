import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import RemovedInventoryController from './RemovedInventoryController';
import RemovedInventoryValidation from './RemovedInventoryValidation';

const router = express.Router();

/**
 * This route will add new inventory
 */
router.post('/', validate(RemovedInventoryValidation.PostRemovedInventory),
  (req, res, next) => {
    logger.info('POST INVENTORY');
    RemovedInventoryController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;
