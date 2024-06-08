// src/user/entities/company.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Account } from '../../account/entities/account.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { Contact } from 'src/contact/entities/contact.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  industry: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User, user => user.company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Account, account => account.company)
  accounts: Account[];

  @OneToMany(() => Transaction, transaction => transaction.company)
  transactions: Transaction[];

  @OneToMany(() => Contact, contact => contact.company) // Add this line
  contacts: Contact[];
}
