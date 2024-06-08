// src/migrations/CreateTransaction1628879943694.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransaction1628879943694 implements MigrationInterface {
  name = 'CreateTransaction1628879943694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "transaction" (
        "id" SERIAL NOT NULL,
        "date" TIMESTAMP NOT NULL,
        "amount" decimal NOT NULL,
        "description" character varying NOT NULL,
        "companyId" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_1d8b63d7d98d83b2f199b13c9b1" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "transaction"
      ADD CONSTRAINT "FK_1a43f16b787cfae9537f4de12a4" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transaction" DROP CONSTRAINT "FK_1a43f16b787cfae9537f4de12a4"
    `);
    await queryRunner.query(`
      DROP TABLE "transaction"
    `);
  }
}
