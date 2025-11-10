import express from 'express';
import { celebrate } from 'celebrate';
import { uploadImg } from '../utils/storage';
import { registerUser } from '../controllers/user';
import { userSchema } from '../validations/user';
import protectedRoute from '../middleware/verifyAuth';
import verifyAdmin from '../middleware/verifyAdmin';

const userRouter = express.Router();

userRouter.post(
  '/register',
  uploadImg,
  celebrate({ body: userSchema }),
  registerUser
);

export default userRouter;
