import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional() // This field is optional
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number; // Required to associate a category
}
