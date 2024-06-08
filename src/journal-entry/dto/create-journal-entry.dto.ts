// src/journal-entry/dto/create-journal-entry.dto.ts
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateJournalEntryDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  debit: number;

  @IsNumber()
  @IsNotEmpty()
  credit: number;

  // @IsNumber()
  // @IsNotEmpty()
  // transactionId: number;
}