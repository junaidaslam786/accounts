// src/journal-entry/journal-entry.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntryService } from './services/journal-entry.service';
import { JournalEntryController } from './controllers/journal-entry.controller';
import { JournalEntry } from './entities/journal-entry.entity';
import { Account } from '../account/entities/account.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, Account, Transaction])],
  controllers: [JournalEntryController],
  providers: [JournalEntryService],
  exports: [JournalEntryService],
})
export class JournalEntryModule {}
