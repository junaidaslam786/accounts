// src/transaction/entities/transaction.entity.ts
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

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column('decimal')
  amount: number;

  @Column()
  description: string;

  @ManyToOne(() => Company, company => company.transactions)
  company: Company;

  @OneToMany(() => JournalEntry, journalEntry => journalEntry.transaction)
  journalEntries: JournalEntry[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
