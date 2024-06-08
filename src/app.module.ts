import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './data-source';
import { HealthController } from './health.controller';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { JournalEntryModule } from './journal-entry/journal-entry.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    TerminusModule,
    UserModule,
    AuthModule,
    AccountModule,
    TransactionModule,
    JournalEntryModule,
    ContactModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
