import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  initialBalance: number;

  @IsNotEmpty()
  @IsIn(['Debit', 'Credit'])
  initialBalanceType: 'Debit' | 'Credit';

  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsNumber()
  contactId: number; // New field for contact (customer/supplier)
}
