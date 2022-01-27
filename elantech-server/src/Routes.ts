import express from 'express';
import userRouter from './features/users/UserRoute';
import driverRouter from './features/drivers/DriverRoute';
import storeRouter from './features/stores/StoreRoute';
import timeFrameRouter from './features/timeFrames/TimeFrameRoute';

const router = express.Router();

router.use('/users', userRouter);
router.use('/drivers', driverRouter);
router.use('/stores', storeRouter);
router.use('/timeFrames', timeFrameRouter);

export default router;
