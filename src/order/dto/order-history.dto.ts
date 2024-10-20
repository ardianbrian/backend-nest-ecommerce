import { IsInt, IsArray, IsOptional, IsNumber } from 'class-validator';

export class OrderHistoryDto {
  @IsInt()
  id: number;

  @IsInt()
  userId: number;

  @IsNumber()
  totalPrice: number;

  @IsOptional()
  status?: string;

  @IsArray()
  orderItems: OrderItemDto[];
}

export class OrderItemDto {
  @IsInt()
  id: number;

  @IsInt()
  orderId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;
}
