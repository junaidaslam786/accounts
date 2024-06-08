// src/account/account.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { Account } from './entities/account.entity';
import { Company } from 'src/user/entities/company.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { JournalEntry } from 'src/journal-entry/entities/journal-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Company, Contact, JournalEntry])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
