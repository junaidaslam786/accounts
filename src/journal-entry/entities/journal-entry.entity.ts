// src/journal-entry/entities/journal-entry.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Account } from '../../account/entities/account.entity';
  import { Transaction } from '../../transaction/entities/transaction.entity';
  
  @Entity()
  export class JournalEntry {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('decimal')
    debit: number;
    
    @Column('decimal')
    credit: number;
    
    @ManyToOne(() => Account, account => account.journalEntries)
    account: Account;
  
    @ManyToOne(() => Transaction, transaction => transaction.journalEntries)
    transaction: Transaction;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  