import express from 'express';
import userRouter from './features/users/UserRoute';
import productRouter from './features/products/ProductRoute';
import inventoryRouter from './features/inventory/InventoryRoute';
import companyRouter from './features/company/CompanyRoute';
import quoteRouter from './features/quotes/QuoteRoute';
import quotedProductsRouter from './features/quotedProducts/QuotedProductsRoute';
import removedInventoryRouter from './features/removedInventory/RemovedInventoryRoute';
import receivingRouter from './features/receiving/ReceivingRoute';
import receivedItemRouter from './features/receivedItem/ReceivedItemRoute';

const router = express.Router();

router.use('/user', userRouter);

router.use('/product', productRouter);

router.use('/inventory', inventoryRouter);

router.use('/company', companyRouter);

router.use('/quote', quoteRouter);

router.use('/quotedProduct', quotedProductsRouter);

router.use('/removedInventory', removedInventoryRouter);

router.use('/receiving', receivingRouter);

router.use('/receivedItem', receivedItemRouter);

export default router;
