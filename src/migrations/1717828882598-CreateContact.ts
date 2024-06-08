import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContact1717828882598 implements MigrationInterface {
  name = 'CreateContact1717828882598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "contacts" (
      "id" SERIAL NOT NULL,
      "name" character varying NOT NULL,
      "email" character varying NOT NULL,
      "phone" character varying NOT NULL,
      "type" character varying NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"),
      CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id")
    )`);

    // Set a default value for existing records in the account table
    await queryRunner.query(`ALTER TABLE "account" ADD "initialBalance" numeric(10, 2) DEFAULT 0`);
    await queryRunner.query(`UPDATE "account" SET "initialBalance" = 0 WHERE "initialBalance" IS NULL`);
    await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "initialBalance" SET NOT NULL`);

    await queryRunner.query(`ALTER TABLE "account" ADD "contactId" integer`);
    await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_34dc94dc45f50c291b4ee0f8b8b" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_34dc94dc45f50c291b4ee0f8b8b"`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "contactId"`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "initialBalance"`);
    await queryRunner.query(`DROP TABLE "contacts"`);
  }
}
