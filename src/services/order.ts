import { prisma } from '../database/prismaClient';
import { orderStatus } from '@prisma/client';

interface OrderItem {
  product_id: string;
  quantity: number;
  total_price: number;
}

export async function getUserOrders(user_id: string) {
  return prisma.order.findMany({
    where: {
      user_id: user_id,
    },
  });
}

export const createOrder = async (userId: string, items: any[]) => {
  return await prisma.$transaction(async (tx) => {
    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { product_id: item.product_id },
      });

      if (!product) {
        throw new Error(`Product with id ${item.product_id} not found`);
      }

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        total_price: itemTotal,
      });

      await tx.product.update({
        where: { product_id: item.product_id },
        data: { stock_quantity: product.stock_quantity - item.quantity },
      });
    }

    const order = await tx.order.create({
      data: {
        user_id: userId,
        total_amount: totalPrice,
        status: orderStatus.PENDING,
        order_items: {
          create: orderItems,
        },
      },
      include: {
        order_items: true,
      },
    });

    return order;
  });
};
