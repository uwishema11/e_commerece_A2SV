import { Request } from 'express';
import { successResponse, errorResponse } from '../helpers/response';
import { addProduct } from '../services/product';
import asyncHandler from '../helpers/aynchHandler';
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const createProduct = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const { stock_quantity } = req.body;
    const image_url = req.file?.path;

    if (stock_quantity <= 0) {
      return errorResponse(res, 'Stock quantity must be greater than 0', 400);
    }

    const newProduct = await addProduct({
      ...req.body,
      image_url,
      userId: req.user?.id,
    });
    return successResponse(
      res,
      newProduct,
      201,
      'New product created successfully'
    );
  }
);
