import { IsEnum, IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

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
  @IsInt()
  companyId: number;
}
