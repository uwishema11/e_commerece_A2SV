import { Prisma, productStatus } from '@prisma/client';
import { prisma } from '../database/prismaClient';
import { productType } from '../types/product';

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
