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

export default productRouter;
