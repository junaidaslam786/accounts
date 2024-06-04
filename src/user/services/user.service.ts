import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { UserUpdate } from '../dto/user-update.dto';
import { CompanyUpdate } from '../dto/company-update.dto';
import { CreateCompanyDto } from '../dto/create-company.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`,
      );
    }

    return user;
  }

  async update(id: number, updates: UserUpdate): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }

    this.userRepository.merge(user, updates);

    return this.userRepository.save(user);
  }

  async findCompanyById(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new NotFoundException(`There isn't any company with id: ${id}`);
    }

    return company;
  }

  async updateCompany(id: number, updates: CompanyUpdate): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new NotFoundException(`There isn't any company with id: ${id}`);
    }

    this.companyRepository.merge(company, updates);

    return this.companyRepository.save(company);
  }

  async createCompanyForUser(userId: number, createCompanyDto: CreateCompanyDto): Promise<Company> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const company = this.companyRepository.create({
      ...createCompanyDto,
      user,
    });
    return this.companyRepository.save(company);
  }
}
