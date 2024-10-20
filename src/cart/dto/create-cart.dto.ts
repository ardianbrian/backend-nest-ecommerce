import { IsOptional, IsInt } from 'class-validator';

export class CreateCartDto {
  @IsOptional() // User ID can be optional
  @IsInt() // Ensure it's an integer
  userId?: number;
}
