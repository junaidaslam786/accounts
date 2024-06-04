import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompany1570141220019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "company" (
          "id" SERIAL NOT NULL,
          "name" character varying NOT NULL,
          "address" character varying,
          "industry" character varying,
          "user_id" integer,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "REL_a24972ebd73b106250713dcddd"
            UNIQUE ("user_id"),
          CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb"
            PRIMARY KEY ("id"),
          CONSTRAINT "FK_a24972ebd73b106250713dcddd9"
            FOREIGN KEY ("user_id")
            REFERENCES "user"("id")
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`,
    );
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
