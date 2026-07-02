import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider, AuthResponse, AuthUser, UserRole } from '@perso/shared';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';

/** Cost factor for bcrypt password hashing. */
const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates an account. The first account on a fresh instance becomes the
   * owner and is always allowed; subsequent sign-ups require the operator to
   * opt in via `ALLOW_REGISTRATION=true`.
   */
  async register(dto: RegisterDto): Promise<AuthResponse> {
    if (await this.usersService.findByEmail(dto.email)) {
      throw new ConflictException('An account with this email already exists');
    }

    const isFirstUser = (await this.usersService.count()) === 0;
    if (!isFirstUser && process.env.ALLOW_REGISTRATION !== 'true') {
      throw new ForbiddenException('Registration is disabled on this instance');
    }

    const user = await this.usersService.create({
      email: dto.email,
      name: dto.name ?? null,
      passwordHash: await bcrypt.hash(dto.password, SALT_ROUNDS),
      role: isFirstUser ? UserRole.Owner : UserRole.Member,
      authProvider: AuthProvider.Local,
    });

    return this.buildAuthResponse(user);
  }

  /** Authenticates an existing account with email and password. */
  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(dto.email);
    if (
      !user ||
      !user.passwordHash ||
      !(await bcrypt.compare(dto.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user);
  }

  /** Returns the current authenticated user's public profile. */
  async getProfile(userId: string): Promise<AuthUser> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.toAuthUser(user);
  }

  private async buildAuthResponse(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: this.toAuthUser(user),
    };
  }

  /** Public view of a user; never exposes the password hash. */
  private toAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
      authProvider: user.authProvider,
    };
  }
}
