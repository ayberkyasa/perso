import 'dotenv/config';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from './typeorm.config';

/**
 * DataSource consumed by the TypeORM CLI (migration:generate / run / revert).
 * Loads `.env` via `dotenv/config` since the CLI runs outside the Nest runtime.
 */
export default new DataSource(buildDataSourceOptions());
