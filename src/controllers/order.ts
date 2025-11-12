import { Request } from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from '../services/order';
import { errorResponse, successResponse } from '../helpers/response';
import asyncHandler from '../helpers/aynchHandler';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const placeOrder = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id as string;
    const items = req.body.items;
    if (!Array.isArray(items) || items.length === 0) {
      return errorResponse(res, 'No items to place an order', 400);
    }

    const order = await createOrder(userId, items);

    return successResponse(res, order, 201, 'Order placed successfully!');
  }
);

export const getOrdersController = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id as string;
    const orders = await getUserOrders(userId);
    successResponse(res, orders, 200, 'Orders retrieved successfully');
  }
);

export const getOrderByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingOrder = await getOrderById(id);
  if (!existingOrder) {
    return errorResponse(res, 'Order is not found', 404);
  }
  const order = await getOrderById(id);
  successResponse(res, order, 200, 'Order retrieved successfully');
});

