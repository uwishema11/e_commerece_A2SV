import express from 'express';
import { celebrate } from 'celebrate';

import * as productController from '../controllers/product';
import protectedRoute from '../middleware/verifyAuth';
import verifyAdmin from '../middleware/verifyAdmin';
import { productSchema } from '../validations/product';
import { uploadImg } from '../utils/storage';

const productRouter = express.Router();

productRouter.post(
  '/create',
  uploadImg,
  celebrate({ body: productSchema }),
  protectedRoute,
  verifyAdmin,
  productController.createProduct
);
productRouter.patch(
  '/edit/:id',
  uploadImg,
  protectedRoute,
  verifyAdmin,
  productController.updateProductById
);
productRouter.delete(
  '/delete/:id',
  protectedRoute,
  verifyAdmin,
  productController.deleteProductById
);

export default productRouter;
