import { AuthProvider, UserRole } from '@perso/shared';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Dashboard } from '../../dashboards/entities/dashboard.entity';

@Entity('users')
export class User extends BaseEntity {
  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl: string | null;

  // bcrypt hash; null for non-local accounts (future OIDC/SSO).
  @Column({ type: 'varchar', nullable: true })
  passwordHash: string | null;

  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.Local })
  authProvider: AuthProvider;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Member })
  role: UserRole;

  @OneToMany(() => Dashboard, (dashboard) => dashboard.user)
  dashboards: Dashboard[];
}
