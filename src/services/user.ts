import { prisma } from '../database/prismaClient';
import { Prisma } from '@prisma/client';
import { Role, UserStatus } from '@prisma/client';
;

import { userType } from '../types/user';



interface userParams {
  filter: UserStatus;
  page: number;
  limit: number;
  search: string;
}

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
