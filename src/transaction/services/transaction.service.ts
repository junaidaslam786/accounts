// src/transaction/services/transaction.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Company } from 'src/user/entities/company.entity';
import { JournalEntryService } from 'src/journal-entry/services/journal-entry.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly journalEntryService: JournalEntryService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const company = await this.companyRepository.findOne({ where: { id: createTransactionDto.companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createTransactionDto.companyId} not found`);
    }

    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      date: new Date(createTransactionDto.date), // Convert to Date instance
      company, // Set the company relation
    });
    const savedTransaction = await this.transactionRepository.save(transaction);

    for (const entry of createTransactionDto.journalEntries) {
      await this.journalEntryService.create(entry, savedTransaction);
    }

    return savedTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id }, relations: ['journalEntries'] });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    await this.transactionRepository.update(id, updateTransactionDto);
    const updatedTransaction = await this.transactionRepository.findOne({ where: { id } });
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updatedTransaction;
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
