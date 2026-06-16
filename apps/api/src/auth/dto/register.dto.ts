import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import type { RegisterRequest } from '@perso/shared';

export class RegisterDto implements RegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;
}
