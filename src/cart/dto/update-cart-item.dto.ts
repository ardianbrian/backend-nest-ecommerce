import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateCartItemDto {
  @IsInt() // Pastikan 'id' adalah integer
  id: number; // Properti id harus ada untuk referensi CartItem yang ingin diperbarui

  @IsOptional()
  @IsPositive() // Ensure quantity is a positive number
  quantity?: number;
}
