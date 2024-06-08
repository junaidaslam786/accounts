// src/journal-entry/controllers/journal-entry.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JournalEntryService } from '../services/journal-entry.service';
import { CreateJournalEntryDto } from '../dto/create-journal-entry.dto';
import { UpdateJournalEntryDto } from '../dto/update-journal-entry.dto';

@Controller('journal-entries')
export class JournalEntryController {
  constructor(private readonly journalEntryService: JournalEntryService) {}

  @Get()
  async findAll() {
    return this.journalEntryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.journalEntryService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJournalEntryDto: UpdateJournalEntryDto) {
    return this.journalEntryService.update(+id, updateJournalEntryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.journalEntryService.remove(+id);
  }
}
