import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class AddCartItemDto {
  @IsNotEmpty()
  @IsInt() // Ensure it's an integer
  productId: number;

  @IsNotEmpty()
  @IsPositive() // Ensure quantity is a positive number
  quantity: number;
}
