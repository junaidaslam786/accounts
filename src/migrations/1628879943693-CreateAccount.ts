// src/migrations/CreateAccount1628879943693.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccount1628879943693 implements MigrationInterface {
  name = 'CreateAccount1628879943693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "account" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "type" character varying NOT NULL,
        "companyId" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_ac5e0f4a48c4e7b5f8e3f72a8cf" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "account"
      ADD CONSTRAINT "FK_0979b1457799c6b8b5e3f72a8cf" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "account" DROP CONSTRAINT "FK_0979b1457799c6b8b5e3f72a8cf"
    `);
    await queryRunner.query(`
      DROP TABLE "account"
    `);
  }
}
