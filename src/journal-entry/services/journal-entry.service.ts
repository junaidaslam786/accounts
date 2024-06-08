// src/journal-entry/services/journal-entry.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JournalEntry } from '../entities/journal-entry.entity';
import { CreateJournalEntryDto } from '../dto/create-journal-entry.dto';
import { UpdateJournalEntryDto } from '../dto/update-journal-entry.dto';
import { Account } from '../../account/entities/account.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Injectable()
export class JournalEntryService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createJournalEntryDto: CreateJournalEntryDto, transaction: Transaction): Promise<JournalEntry> {
    const account = await this.accountRepository.findOneBy({ id: createJournalEntryDto.accountId });
    if (!account) {
      throw new NotFoundException(`Account with ID ${createJournalEntryDto.accountId} not found`);
    }

    const journalEntry = this.journalEntryRepository.create({
      account,
      debit: createJournalEntryDto.debit,
      credit: createJournalEntryDto.credit,
      transaction,
    });

    return this.journalEntryRepository.save(journalEntry);
  }

  async findAll(): Promise<JournalEntry[]> {
    return this.journalEntryRepository.find();
  }

  async findOne(id: number): Promise<JournalEntry> {
    const journalEntry = await this.journalEntryRepository.findOneBy({ id });
    if (!journalEntry) {
      throw new NotFoundException(`Journal Entry with ID ${id} not found`);
    }
    return journalEntry;
  }

  async update(id: number, updateJournalEntryDto: UpdateJournalEntryDto): Promise<JournalEntry> {
    const journalEntry = await this.journalEntryRepository.findOneBy({ id });
    if (!journalEntry) {
      throw new NotFoundException(`Journal Entry with ID ${id} not found`);
    }

    const updatedJournalEntry = this.journalEntryRepository.merge(journalEntry, updateJournalEntryDto);
    return this.journalEntryRepository.save(updatedJournalEntry);
  }

  async remove(id: number): Promise<void> {
    await this.journalEntryRepository.delete(id);
  }
}
