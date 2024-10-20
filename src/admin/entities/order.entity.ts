import { OrderItem } from './order-item.entity';

// src/admin/entities/order.entity.ts
export class Order {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems?: OrderItem[]; // Assuming orderItems is an array of OrderItem objects
}
