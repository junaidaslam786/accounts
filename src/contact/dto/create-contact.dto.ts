import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEnum(["customer", "supplier"])
  type: "customer" | "supplier";

  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
