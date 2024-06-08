// src/contact/controllers/contact.controller.ts
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
  import { ContactService } from '../services/contact.service';
  import { CreateContactDto } from '../dto/create-contact.dto';
  import { UpdateContactDto } from '../dto/update-contact.dto';
  import { Contact } from '../entities/contact.entity';
  import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  
  @UseGuards(JWTAuthGuard)
  @Controller('contacts')
  export class ContactController {
    constructor(private readonly contactService: ContactService) {}
  
    @Post()
    create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
      return this.contactService.create(createContactDto);
    }
  
    @Get()
    findAll(): Promise<Contact[]> {
      return this.contactService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
      return this.contactService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateContactDto: UpdateContactDto,
    ): Promise<Contact> {
      return this.contactService.update(id, updateContactDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.contactService.remove(id);
    }
  }
  