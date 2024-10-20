import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  status?: string;
}
