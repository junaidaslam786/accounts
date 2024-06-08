// src/migrations/CreateJournalEntry1628879943695.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJournalEntry1628879943695 implements MigrationInterface {
  name = 'CreateJournalEntry1628879943695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "journal_entry" (
        "id" SERIAL NOT NULL,
        "debit" decimal NOT NULL,
        "credit" decimal NOT NULL,
        "accountId" integer,
        "transactionId" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_945d7a3b5cf7dc534a6fb58a5dc" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "journal_entry"
      ADD CONSTRAINT "FK_28dd34e22d78a6b9e1e7a14fd8d" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "journal_entry"
      ADD CONSTRAINT "FK_2944e4b4f1b9c25f29d1b2496e6" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "journal_entry" DROP CONSTRAINT "FK_2944e4b4f1b9c25f29d1b2496e6"
    `);
    await queryRunner.query(`
      ALTER TABLE "journal_entry" DROP CONSTRAINT "FK_28dd34e22d78a6b9e1e7a14fd8d"
    `);
    await queryRunner.query(`
      DROP TABLE "journal_entry"
    `);
  }
}
