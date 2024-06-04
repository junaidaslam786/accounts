import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';

import { CreateUser1557166726050 } from './migrations/1557166726050-CreateUser';
import { CreateCompany1570141220019 } from './migrations/1570141220019-CreateCompany';
import { CreateSessionStorage1584985637890 } from './migrations/1584985637890-CreateSessionStorage';

import { Company } from './user/entities/company.entity';
import { User } from './user/entities/user.entity';
import { companyFactory } from './user/factories/company.factory';
import { userFactory } from './user/factories/user.factory';
import { CompanySeeder } from './user/seeders/company.seeder';
import { UserSeeder } from './user/seeders/user.seeder';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Company],
  migrations: [
    CreateUser1557166726050,
    CreateCompany1570141220019,
    CreateSessionStorage1584985637890,
    
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
