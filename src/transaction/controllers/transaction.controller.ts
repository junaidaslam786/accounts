// src/transaction/controllers/transaction.controller.ts
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
  import { TransactionService } from '../services/transaction.service';
  import { CreateTransactionDto } from '../dto/create-transaction.dto';
  import { UpdateTransactionDto } from '../dto/update-transaction.dto';
  import { Transaction } from '../entities/transaction.entity';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  
  @UseGuards(JWTAuthGuard)
  @Controller('transactions')
  export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}
  
    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
      return this.transactionService.create(createTransactionDto);
    }
  
    @Get()
    findAll(): Promise<Transaction[]> {
      return this.transactionService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Transaction> {
      return this.transactionService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTransactionDto: UpdateTransactionDto,
    ): Promise<Transaction> {
      return this.transactionService.update(id, updateTransactionDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.transactionService.remove(id);
    }
  }
  