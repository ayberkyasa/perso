import { MigrationInterface, QueryRunner } from "typeorm";

export class InitCoreSchema1781036738174 implements MigrationInterface {
    name = 'InitCoreSchema1781036738174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "name" character varying, "avatar_url" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "dashboards" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "description" text, "columns" integer NOT NULL DEFAULT '4', CONSTRAINT "PK_1b4b4bc346118e0d335f16c5344" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a4f2a44f108ed840a13c1c6fe" ON "dashboards" ("user_id") `);
        await queryRunner.query(`CREATE TYPE "public"."widgets_type_enum" AS ENUM('finance', 'sports', 'job_alert', 'discount', 'tech_stack', 'email', 'tasks', 'notes')`);
        await queryRunner.query(`CREATE TABLE "widgets" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dashboard_id" uuid NOT NULL, "type" "public"."widgets_type_enum" NOT NULL, "title" character varying, "x" integer NOT NULL, "y" integer NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "is_locked" boolean NOT NULL DEFAULT false, "config" jsonb, CONSTRAINT "PK_da23136dbcfc91424451e24b725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6317057fb9b4d98837ca9747f5" ON "widgets" ("dashboard_id") `);
        await queryRunner.query(`ALTER TABLE "dashboards" ADD CONSTRAINT "FK_6a4f2a44f108ed840a13c1c6fee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "widgets" ADD CONSTRAINT "FK_6317057fb9b4d98837ca9747f57" FOREIGN KEY ("dashboard_id") REFERENCES "dashboards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "widgets" DROP CONSTRAINT "FK_6317057fb9b4d98837ca9747f57"`);
        await queryRunner.query(`ALTER TABLE "dashboards" DROP CONSTRAINT "FK_6a4f2a44f108ed840a13c1c6fee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6317057fb9b4d98837ca9747f5"`);
        await queryRunner.query(`DROP TABLE "widgets"`);
        await queryRunner.query(`DROP TYPE "public"."widgets_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a4f2a44f108ed840a13c1c6fe"`);
        await queryRunner.query(`DROP TABLE "dashboards"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
