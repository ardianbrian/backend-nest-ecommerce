// src/cart/entities/cart.entity.ts
import { CartItem } from './cart-item.entity';

export type Cart = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  cartItems: CartItem[]; // Properti ini harus ada
  userId?: number; // Jika Anda ingin mengaitkan dengan User
};
