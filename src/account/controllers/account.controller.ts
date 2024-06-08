// src/account/controllers/account.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Account } from '../entities/account.entity';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateInitialBalanceDto } from '../dto/update-initial-balance.dto';

@UseGuards(JWTAuthGuard)
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Account> {
    return this.accountService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.accountService.remove(id);
  }

  @Put(':id/initial-balance')
  updateInitialBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInitialBalanceDto: UpdateInitialBalanceDto,
  ): Promise<Account> {
    return this.accountService.updateInitialBalance(id, updateInitialBalanceDto);
  }

  @Get(':id/journal-entries')
  getAccountJournalEntries(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.getAccountJournalEntries(id);
  }
}
