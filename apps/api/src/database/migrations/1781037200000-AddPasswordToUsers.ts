import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUsers1781037200000 implements MigrationInterface {
  name = 'AddPasswordToUsers1781037200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password_hash" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
  }
}
