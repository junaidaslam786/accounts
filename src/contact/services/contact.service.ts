import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities/contact.entity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { AccountService } from '../../account/services/account.service';
import { Account } from 'src/account/entities/account.entity';
import { Company } from 'src/user/entities/company.entity';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly accountService: AccountService,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
    const savedContact = await this.contactRepository.save(contact);

    const company = await this.companyRepository.findOne({ where: { id: createContactDto.companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createContactDto.companyId} not found`);
    }

    const accountDto: CreateAccountDto = {
      name: `${savedContact.name} Account`,
      type: 'Asset', // or another type depending on your requirements
      initialBalance: 0, // or another value depending on your requirements
      initialBalanceType: 'Credit', // or 'Debit', depending on the context
      companyId: createContactDto.companyId,
      contactId: savedContact.id,
    };

    await this.accountService.create(accountDto);

    return savedContact;
  }

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    this.contactRepository.merge(contact, updateContactDto);
    return this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
