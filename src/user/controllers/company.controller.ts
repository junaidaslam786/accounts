import {
  Controller,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  ParseIntPipe,
  Put,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from '../services/user.service';
import { CompanyUpdate } from '../dto/company-update.dto';
import { JWTAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';

@Controller('company')
@UseGuards(JWTAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CompanyController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number): Promise<Company> {
    return this.userService.findCompanyById(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatesCompany: CompanyUpdate,
  ): Promise<Company> {
    return this.userService.updateCompany(id, updatesCompany);
  }

  @Post(':userId')
  async createCompany(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    const company = await this.userService.createCompanyForUser(userId, createCompanyDto);
    if (!company) {
      throw new HttpException('Company creation failed', HttpStatus.BAD_REQUEST);
    }
    return company;
  }
}
