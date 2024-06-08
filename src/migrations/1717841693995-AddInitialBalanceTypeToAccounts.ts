import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddInitialBalanceTypeToAccounts1717841693995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('account', new TableColumn({
          name: 'initialBalanceType',
          type: 'varchar',
          isNullable: false,
          default: "'Debit'", // default value can be either 'Debit' or 'Credit'
        }));
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('account', 'initialBalanceType');
      }

}
