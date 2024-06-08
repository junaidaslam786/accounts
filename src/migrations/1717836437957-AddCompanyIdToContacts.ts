// import { MigrationInterface, QueryRunner } from "typeorm";

// export class AddCompanyIdToContacts1717836437957 implements MigrationInterface {

//     name = 'AddCompanyIdToContacts1717836437957'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "contacts" ADD "companyId" integer`);
//         await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_company_contacts" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_company_contacts"`);
//         await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "companyId"`);
//     }
// }

import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddCompanyIdToContacts1717836437957 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('contacts', new TableColumn({
            name: 'companyId',
            type: 'int',
            isNullable: false
        }));
        await queryRunner.createForeignKey('contacts', new TableForeignKey({
            columnNames: ['companyId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'company',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('contacts');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('companyId') !== -1);
        await queryRunner.dropForeignKey('contacts', foreignKey);
        await queryRunner.dropColumn('contacts', 'companyId');
    }
}

