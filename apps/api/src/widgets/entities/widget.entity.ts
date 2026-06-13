import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Dashboard } from '../../dashboards/entities/dashboard.entity';
import { WidgetType } from '../widget-type.enum';

@Entity('widgets')
export class Widget extends BaseEntity {
  @Index()
  @Column('uuid')
  dashboardId: string;

  @ManyToOne(() => Dashboard, (dashboard) => dashboard.widgets, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'dashboard_id' })
  dashboard: Dashboard;

  @Column({ type: 'enum', enum: WidgetType })
  type: WidgetType;

  @Column({ type: 'varchar', nullable: true })
  title: string | null;

  // Grid placement, in the dashboard's bento-grid coordinate space.
  @Column('int')
  x: number;

  @Column('int')
  y: number;

  @Column('int')
  width: number;

  @Column('int')
  height: number;

  @Column({ type: 'boolean', default: false })
  isLocked: boolean;

  /** Widget-specific settings (e.g. tracked stock ticker, feed sources). */
  @Column({ type: 'jsonb', nullable: true })
  config: Record<string, unknown> | null;
}
