// src/transaction/transaction.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { UserModule } from 'src/user/user.module';
import { Company } from 'src/user/entities/company.entity';
import { JournalEntry } from 'src/journal-entry/entities/journal-entry.entity';
import { JournalEntryModule } from 'src/journal-entry/journal-entry.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Company, JournalEntry]), UserModule, JournalEntryModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
