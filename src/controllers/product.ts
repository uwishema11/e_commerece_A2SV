import { Request, Response } from 'express';
import { productStatus } from '@prisma/client';
import { successResponse, errorResponse } from '../helpers/response';
import {
  addProduct,
  findProductById,
  updateProduct,
  deleteProduct,
  findAllProducts,
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
    const product = {
      ...req.body,
      image_url,
      user_id: req.user.id,
    };
    const isProductExist = await findProductById(id);
    if (!isProductExist) {
      return errorResponse(res, 'Product not found', 404);
    }
    const updatedProduct = await updateProduct(id, product);
    successResponse(res, updatedProduct, 201, 'Product updated successfully');
  }
);

export const deleteProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isProductExist = await findProductById(id);
  if (!isProductExist) {
    return errorResponse(res, 'Product not found', 404);
  }
  const response = await deleteProduct(id);
  successResponse(
    res,
    response,
    200,
    'Product have been deleted successfully'
  );
});

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await findProductById(id);
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    successResponse(res, product, 200, 'Product retrieved successfully');
  }
);

export const getProducts = asyncHandler(async (req, res) => {
  const body = {
    page: parseInt(req.query.page as string) || 1,
    per_page: parseInt(req.query.limit as string) || 10,
    filter: req.query.filter as productStatus,
    search: (req.query.search as string) || '',
  };
  const products = await findAllProducts(body);

  successResponse(res, products, 200, 'Products retrieved successfully');
});
