import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional() // Username bersifat opsional (hanya jika ingin mengubahnya)
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  username?: string;
}
