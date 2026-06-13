import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Widget } from '../../widgets/entities/widget.entity';

@Entity('dashboards')
export class Dashboard extends BaseEntity {
  @Index()
  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, (user) => user.dashboards, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  /** Number of columns in the bento grid this dashboard renders. */
  @Column({ type: 'int', default: 4 })
  columns: number;

  @OneToMany(() => Widget, (widget) => widget.dashboard)
  widgets: Widget[];
}
