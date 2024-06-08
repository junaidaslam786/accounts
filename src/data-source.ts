import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { CreateUser1557166726050 } from './migrations/1557166726050-CreateUser';
import { CreateCompany1570141220019 } from './migrations/1570141220019-CreateCompany';
import { CreateSessionStorage1584985637890 } from './migrations/1584985637890-CreateSessionStorage';
import { CreateAccount1628879943693 } from './migrations/1628879943693-CreateAccount';
import { CreateJournalEntry1628879943695 } from './migrations/1628879943695-CreateJournalEntry';
import { CreateTransaction1628879943694 } from './migrations/1628879943694-CreateTransaction';

import { Company } from './user/entities/company.entity';
import { User } from './user/entities/user.entity';
import { Account } from './account/entities/account.entity';
import { Transaction } from './transaction/entities/transaction.entity';
import { JournalEntry } from './journal-entry/entities/journal-entry.entity';
import { companyFactory } from './user/factories/company.factory';
import { userFactory } from './user/factories/user.factory';
import { CompanySeeder } from './user/seeders/company.seeder';
import { UserSeeder } from './user/seeders/user.seeder';
import { Contact } from './contact/entities/contact.entity';
import { CreateContact1717828882598 } from './migrations/1717828882598-CreateContact';
import { AddCompanyIdToContacts1717836437957 } from './migrations/1717836437957-AddCompanyIdToContacts';
import { AddInitialBalanceTypeToAccounts1717841693995 } from './migrations/1717841693995-AddInitialBalanceTypeToAccounts';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'labkhata',
  entities: [User, Company, Account, Transaction, JournalEntry, Contact],
  migrations: [
    CreateUser1557166726050,
    CreateCompany1570141220019,
    CreateSessionStorage1584985637890,
    CreateAccount1628879943693,
    CreateTransaction1628879943694,
    CreateJournalEntry1628879943695,
    CreateContact1717828882598,
    AddCompanyIdToContacts1717836437957,
    AddInitialBalanceTypeToAccounts1717841693995,
  ],
  synchronize: false,
  extra: {
    ssl:
      process.env.SSL_MODE === 'require'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  },
  factories: [userFactory, companyFactory],
  seeds: [UserSeeder, CompanySeeder],
};

export const appDataSource = new DataSource(dataSourceOptions);
