import { IsInt, IsPositive, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsPositive()
  totalPrice: number;

  @IsArray()
  orderItems: {
    productId: number;
    quantity: number;
    price: number; // Store the price at the time of the order
  }[];
}
