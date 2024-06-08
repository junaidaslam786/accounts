// src/transaction/dto/create-transaction.dto.ts
import { IsNotEmpty, IsNumber, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateJournalEntryDto } from '../../journal-entry/dto/create-journal-entry.dto';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalEntryDto)
  journalEntries: CreateJournalEntryDto[];
}
