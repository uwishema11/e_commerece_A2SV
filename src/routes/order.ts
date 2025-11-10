import express from 'express';
import * as orderController from '../controllers/order';

import protectedRoute from '../middleware/verifyAuth';

const orderRouter = express.Router();

orderRouter.post('/create', protectedRoute, orderController.placeOrder);
orderRouter.get('/', protectedRoute, orderController.getOrdersController);
export default orderRouter;
