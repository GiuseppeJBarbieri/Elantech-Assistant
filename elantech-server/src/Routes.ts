import express from 'express';
import userRouter from './features/users/UserRoute';

const router = express.Router();

router.use('/users', userRouter);

export default router;
