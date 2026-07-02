import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvider, UserRole } from '@perso/shared';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

/** Fields required to persist a new user. */
export interface CreateUserData {
  email: string;
  name: string | null;
  passwordHash: string;
  role: UserRole;
  authProvider: AuthProvider;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /** Total number of accounts; used to detect a fresh instance. */
  count(): Promise<number> {
    return this.usersRepository.count();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  create(data: CreateUserData): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }
}
