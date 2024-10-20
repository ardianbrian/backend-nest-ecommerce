// src/cart/entities/cart-item.entity.ts
import { Product } from '../../product/entities/product.entity'; // Sesuaikan path import
import { Cart } from './cart.entity';

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  cart?: Cart; // Ini penting untuk relasi
  product?: Product; // Relasi opsional ke Product
};
