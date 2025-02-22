import { NextFunction, Request, Response } from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import ProductController from './ProductController';
import ProductValidation from './ProductValidation';
import BaseRoute from '../BaseRoute';

const TAG = 'PRODUCT';

const router = BaseRoute(ProductController, ProductValidation, TAG);

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

/**
 * This route will add new product
 * @route POST /
 * @group Product Table
 * @param {IProduct} body.body.required - Product object
 * @returns {IProduct} 201 - Product object
 * @returns {Error}  default - Unexpected error
 */
router.post('/',
  authenticationMiddleware,
  validate(ProductValidation.Post),
  (req: Request, res: Response, next: NextFunction) => {
    logger.info(`POST ${TAG}`);

    req.body.userId = req.session['userId'];
    ProductController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This function will delete a product by it's id
 * @route DELETE /{id}
 * @group Product Table
 * @param {number} id.path.required - Product id
 * @returns {void} 201 - Product deleted
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id',
  authenticationMiddleware,
  validate(ProductValidation.Delete),
  (req: Request, res: Response, next: NextFunction) => {
    logger.info(`DELETE ${TAG}`);

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
