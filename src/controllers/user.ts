import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import redis from '../config/redis';

import {
  addUser,
  findUserByEmail,
} from '../services/user';
import { userType } from '../types/user';
import {
  verifyAccessToken,
  generateAccessToken,
} from '../helpers/generateToken';
import { successResponse, errorResponse } from '../helpers/response';
import asyncHandler from '../helpers/aynchHandler';

import { UserStatus } from '@prisma/client';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const registerUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const image_url = req.file?.path;

  const isUser = await findUserByEmail(email);
  if (isUser) {
    return errorResponse(
      res,
      'User with the provided email already exists! Please try using different email',
      400
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const body: userType = {
    ...req.body,
    image_url,
    password: hashedPassword,
  };

  delete body.confirm_password;

  const newUser = await addUser(body);

  newUser.password = '';

  successResponse(
    res,
    newUser,
    201,
    'User registered successfully. Please check your email to verify your account.'
  );
});
