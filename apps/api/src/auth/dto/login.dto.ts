import { IsEmail, IsString } from 'class-validator';
import type { LoginRequest } from '@perso/shared';

export class LoginDto implements LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
