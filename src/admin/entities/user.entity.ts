import { Order } from './order.entity';

// src/admin/entities/user.entity.ts
export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
  cartId?: number;
}
