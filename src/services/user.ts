import { prisma } from '../database/prismaClient';

import { userType } from '../types/user';

export const addUser = async (newUser: userType) => {
  const registeredUser = await prisma.user.create({
    data: {
      ...newUser,
    },
  });
  return registeredUser;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
