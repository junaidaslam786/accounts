// src/account/dto/update-initial-balance.dto.ts
import { IsNumber, IsEnum } from 'class-validator';

export class UpdateInitialBalanceDto {
  @IsNumber()
  initialBalance: number;

  @IsEnum(['Debit', 'Credit'])
  initialBalanceType: 'Debit' | 'Credit';
}
