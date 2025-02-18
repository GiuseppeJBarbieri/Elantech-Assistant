import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ProductController from './ProductController';
import ProductValidation from './ProductValidation';
import BaseRoute from '../BaseRoute';

const router = BaseRoute(ProductController, ProductValidation);

// Override the POST route
router.stack = router.stack.filter((layer) => !(layer.route
  && layer.route.path === '/'
  && layer.route.methods.post
));

// Override the DELETE route
router.stack = router.stack.filter((layer) => !(layer.route
  && layer.route.path === '/:id'
  && layer.route.methods.delete
));

// Add custom POST implementation
router.post('/', authenticationMiddleware, validate(ProductValidation.Post),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.info('POST PRODUCT');
    try {
      // eslint-disable-next-line dot-notation
      req.body.userId = req.session['userId'];
      const response = await ProductController.Add(req.body);
      res.status(201).json(response);
    } catch (err) {
      logger.info(err, req.body);
      next(err);
    }
  });

/**
* This route will delete a product by product number
*/
router.delete('/:id', authenticationMiddleware, validate(ProductValidation.Delete), (req, res, next) => {
  logger.info('DELETE PRODUCT');
  // eslint-disable-next-line dot-notation
  if (req.session['userType'] === 1) {
    ProductController.Delete(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
