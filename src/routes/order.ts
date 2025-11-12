import express from 'express';
import { placeOrder, getOrdersController } from '../controllers/order';

import protectedRoute from '../middleware/verifyAuth';

const orderRouter = express.Router();

orderRouter.post('/create', protectedRoute, placeOrder);
orderRouter.get('/', protectedRoute, getOrdersController);

export default orderRouter;
