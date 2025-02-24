import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ReceivedItemController from './ReceivedItemController';
import ReceivedItemValidation from './ReceivedItemValidation';
import BaseRoute from '../BaseRoute';

const TAG: string = 'RECEIVED ITEM';

const router = BaseRoute(ReceivedItemController, ReceivedItemValidation, TAG);

// Override the POST route
router.stack = router.stack.filter((layer) => !(layer.route
  && layer.route.path === '/'
  && layer.route.methods.post
));

/**
 * This route will add new ReceivedItem
 * @route POST /
 * @group ReceivedItem Table
 * @param {IReceivedItem} body.body.required - ReceivedItem object
 * @returns {IReceivedItem} 201 - ReceivedItem object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', authenticationMiddleware, validate(ReceivedItemValidation.Post),
  (req, res, next) => {
    logger.info(`POST ${TAG}`);

    req.body.userId = req.session['userId'];
    ReceivedItemController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will fetch a ReceivedItem by receiving id
* @route GET /receiving/{id}
* @group ReceivedItem Table
* @param {number} id.path.required - Receiving id
* @returns {IReceivedItem} 200 - ReceivedItem object
* @returns {Error}  default - Unexpected error
*/
router.get('/receiving/:id', authenticationMiddleware, validate(ReceivedItemValidation.GetByOrderId),
  (req, res, next) => {
    logger.info(`GET ${TAG} by Receiving Id`);

    ReceivedItemController.GetByReceivingId(Number(req.params.id))
      .then((receivedItems) => {
        res.status(200).json(receivedItems);
      })
      .catch((err) => next(err));
  });

export default router;
