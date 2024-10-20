// src/order/entities/order.entity.ts
import { OrderItem } from './order-item.entity';

export class Order {
  id: number;
  userId: number;
  totalPrice: number;
  status: string; // e.g., 'pending', 'completed', etc.
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
}
