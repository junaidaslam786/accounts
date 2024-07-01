import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Company } from '../../user/entities/company.entity';
import { Contact } from '../../contact/entities/contact.entity';
import { UpdateInitialBalanceDto } from '../dto/update-initial-balance.dto';
import { JournalEntry } from 'src/journal-entry/entities/journal-entry.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const company = await this.companyRepository.findOne({ where: { id: createAccountDto.companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createAccountDto.companyId} not found`);
    }

    let contact: Contact | null = null;
    if (createAccountDto.contactId) {
      contact = await this.contactRepository.findOne({ where: { id: createAccountDto.contactId } });
      if (!contact) {
        throw new NotFoundException(`Contact with ID ${createAccountDto.contactId} not found`);
      }
    }
    const account = this.accountRepository.create({
      ...createAccountDto,
      company,
      contact,
    });

    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    const company = await this.companyRepository.findOne({ where: { id: updateAccountDto.companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${updateAccountDto.companyId} not found`);
    }

    const contact = await this.contactRepository.findOne({ where: { id: updateAccountDto.contactId } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${updateAccountDto.contactId} not found`);
    }

    this.accountRepository.merge(account, updateAccountDto, { company, contact });

    return this.accountRepository.save(account);
  }

  async updateInitialBalance(id: number, updateInitialBalanceDto: UpdateInitialBalanceDto): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    account.initialBalance = updateInitialBalanceDto.initialBalance;
    account.initialBalanceType = updateInitialBalanceDto.initialBalanceType;

    return this.accountRepository.save(account);
  }

  async remove(id: number): Promise<void> {
    await this.accountRepository.delete(id);
  }

  async getAccountJournalEntries(accountId: number): Promise<any> {
    const account = await this.accountRepository.findOne({ where: { id: accountId } });
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }

    const journalEntries = await this.journalEntryRepository.find({ where: { account: { id: accountId } } });

    let totalDebit = 0;
    let totalCredit = 0;

    journalEntries.forEach(entry => {
      totalDebit += Number(entry.debit);
      totalCredit += Number(entry.credit);
    });

    const initialBalance = account.initialBalanceType === 'Debit' ? account.initialBalance : -account.initialBalance;
    const totalBalance = initialBalance + totalDebit - totalCredit;

    return {
      accountId,
      initialBalance: account.initialBalance,
      initialBalanceType: account.initialBalanceType,
      totalDebit,
      totalCredit,
      totalBalance,
      journalEntries,
    };
  }
}
