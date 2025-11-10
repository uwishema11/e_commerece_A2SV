import express from 'express';
import { celebrate } from 'celebrate';
import { uploadImg } from '../utils/storage';
import { registerUser, login } from '../controllers/user';
import { userSchema } from '../validations/user';

const userRouter = express.Router();

userRouter.post(
  '/register',
  uploadImg,
  celebrate({ body: userSchema }),
  registerUser
);

userRouter.post('/login', login);

export default userRouter;
