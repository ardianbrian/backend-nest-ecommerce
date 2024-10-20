// src/product/dto/get-product.dto.ts

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNumber()
  categoryId: number;
}
