import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * Builds the TypeORM connection options from environment variables. Shared by
 * the Nest runtime (DatabaseModule) and the TypeORM CLI (data-source.ts) so
 * the app and migrations always target the same schema.
 */
export function buildDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'perso',
    password: process.env.DB_PASSWORD ?? 'perso',
    database: process.env.DB_NAME ?? 'perso',
    // Use the built-in gen_random_uuid() (Postgres 13+) for UUID defaults
    // instead of requiring the uuid-ossp extension.
    uuidExtension: 'pgcrypto',
    namingStrategy: new SnakeNamingStrategy(),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    // Schema changes always go through versioned migrations.
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',
  };
}
