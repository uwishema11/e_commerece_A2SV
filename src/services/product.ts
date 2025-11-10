import { Prisma, productStatus } from '@prisma/client';
import { prisma } from '../database/prismaClient';
import { productType } from '../types/product';

interface filterParamsType {
  filter: productStatus;
  page: number;
  search: string;
  per_page: number;
}

export const addProduct = async (newProduct: productType) => {
  const registeredProduct = await prisma.product.create({
    data: {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      stock_quantity: newProduct.stock_quantity,
      image_url: newProduct.image_url,
      user: { connect: { id: newProduct.userId } },
      category: {
        connectOrCreate: {
          where: { category_name: newProduct.category_name },
          create: { category_name: newProduct.category_name },
        },
      },
    },
    include: {
      category: true,
      user: true,
    },
  });
  return registeredProduct;
};

export const updateProduct = async (
  id: string,
  updatedProduct: Partial<productType>
) => {
  return await prisma.product.update({
    data: {
      ...updatedProduct,
      updated_at: new Date(),
    },
    where: { product_id: id },
  });
};

export const findProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      product_id: id,
    },
  });
  return product;
};

export const deleteProduct = async (id: string) => {
  console.log('Deleting product with ID:', id);
  return await prisma.product.delete({
    where: { product_id: id },
  });
};

export const findAllProducts = async (queryParams: filterParamsType) => {
  const { page, per_page, search, filter } = queryParams;
  const whereClouse = {
    ...(filter ? { status: filter } : {}),
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search.toString(),
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              description: {
                contains: search.toString(),
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {}),
  };
  const products = await prisma.product.findMany({
    where: whereClouse,
    skip: (page - 1) * per_page,
    take: Number(per_page),
    orderBy: {
      updated_at: 'desc',
    },
  });

  const total = await prisma.product.count({
    where: whereClouse,
  });

  const totalPages = Math.ceil(total / per_page);

  return {
    data: products,
    pagination: {
      total,
      page: Number(page),
      per_page: Number(per_page),
      totalPages,
    },
  };
};
