import { Request } from 'express';
import { successResponse, errorResponse } from '../helpers/response';
import {
  addProduct,
  findProductById,
  updateProduct,
} from '../services/product';
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

export const updateProductById = asyncHandler(
  async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    const image_url = req.file?.path;
    if (!req.user) {
      return errorResponse(res, 'Unauthorized to perform this action', 401);
    }
    console.log(req.body)
    const result = {
      ...req.body,
      image_url,
      user_id: req.user.id,
    };
    const isProductExist = await findProductById(id);
    if (!isProductExist) {
      return errorResponse(res, 'Product not found', 404);
    }
    const response = await updateProduct(id, result);
    console.log(response.name);
    successResponse(res, response, 200, 'Product updated successfully');
  }
);
