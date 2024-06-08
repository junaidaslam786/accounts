// src/account/entities/account.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from '../../user/entities/company.entity';
import { JournalEntry } from '../../journal-entry/entities/journal-entry.entity';
import { Contact } from '../../contact/entities/contact.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // e.g., Asset, Liability, Equity, Revenue, Expense

  @Column('decimal', { precision: 10, scale: 2 })
  initialBalance: number;

  @Column()
  initialBalanceType: 'Debit' | 'Credit';

  @ManyToOne(() => Company, company => company.accounts)
  company: Company;

  @OneToMany(() => JournalEntry, journalEntry => journalEntry.account)
  journalEntries: JournalEntry[];

  @ManyToOne(() => Contact, (contact) => contact.accounts)
  contact: Contact;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
