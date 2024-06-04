import { Test, type TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from 'ts-auto-mock';
import type { Repository } from 'typeorm';

import type { UserUpdate } from '../dto/user-update.dto';
import type { CompanyUpdate } from '../dto/company-update.dto';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockedUserRepository: jest.Mocked<Repository<User>>;
  let mockedCompanyRepository: jest.Mocked<Repository<Company>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .useMocker(token => {
        if (Object.is(token, getRepositoryToken(User))) {
          return createMock<Repository<User>>();
        }
        if (Object.is(token, getRepositoryToken(Company))) {
          return createMock<Repository<Company>>();
        }
      })
      .compile();

    service = module.get<UserService>(UserService);
    mockedUserRepository = module.get(getRepositoryToken(User));
    mockedCompanyRepository = module.get(getRepositoryToken(Company));
  });

  it('should be an instance of UserService', () => {
    expect(service).toBeInstanceOf(UserService);
  });

  it('should create a new user', async () => {
    const data = {
      name: 'John Doe',
      email: 'john@doe.me',
      password: 'Pa$$w0rd',
    };

    mockedUserRepository.save.mockResolvedValueOnce(createMock<User>(data));
    const user = await service.create(data);

    expect(user).toBeDefined();
  });

  it('should find one user', async () => {
    const email = 'john@doe.me';

    mockedUserRepository.findOne.mockResolvedValueOnce(
      createMock<User>({ email }),
    );
    const user = await service.findOne({ where: { email } });

    expect(user).toBeDefined();
    expect(user).toHaveProperty('email', 'john@doe.me');
  });

  it('should throw on find one when the user does not exist', async () => {
    mockedUserRepository.findOne.mockResolvedValueOnce(undefined);

    await expect(
      service.findOne({ where: { email: 'notexisting@example.com' } }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any user with identifier: [object Object]"`,
    );
  });

  it('should update a user', async () => {
    const id = 1;
    const updates: UserUpdate = {
      name: 'Johnny Doe',
    };

    mockedUserRepository.findOneBy.mockResolvedValueOnce(
      createMock<User>({ id }),
    );
    mockedUserRepository.save.mockResolvedValueOnce(
      createMock<User>({ ...updates, id }),
    );

    const user = await service.update(id, updates);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('name', updates.name);
  });

  it('should throw on update when the user does not exist', async () => {
    const id = 0;
    const updates: UserUpdate = {
      name: 'Johnny Doe',
    };

    mockedUserRepository.findOneBy.mockResolvedValueOnce(undefined);

    await expect(
      service.update(id, updates),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any user with id: 0"`,
    );
  });

  it('should find one company', async () => {
    const id = 1;
    const companyData = {
      id,
      name: 'Tech Innovators',
      address: '123 Tech Street',
      industry: 'Technology',
    };

    mockedCompanyRepository.findOne.mockResolvedValueOnce(
      createMock<Company>(companyData),
    );

    const company = await service.findCompanyById(id);

    expect(company).toBeDefined();
    expect(company).toHaveProperty('name', 'Tech Innovators');
  });

  it('should throw on find one company when the company does not exist', async () => {
    const id = 0;

    mockedCompanyRepository.findOne.mockResolvedValueOnce(undefined);

    await expect(service.findCompanyById(id)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any company with id: 0"`,
    );
  });

  it('should update a company', async () => {
    const id = 1;
    const updates: CompanyUpdate = {
      name: 'Tech Innovators Ltd.',
    };

    mockedCompanyRepository.findOne.mockResolvedValueOnce(
      createMock<Company>({ id }),
    );
    mockedCompanyRepository.save.mockResolvedValueOnce(
      createMock<Company>({ ...updates, id }),
    );

    const company = await service.updateCompany(id, updates);

    expect(company).toBeDefined();
    expect(company).toHaveProperty('name', updates.name);
  });

  it('should throw on update when the company does not exist', async () => {
    const id = 0;
    const updates: CompanyUpdate = {
      name: 'Tech Innovators Ltd.',
    };

    mockedCompanyRepository.findOne.mockResolvedValueOnce(undefined);

    await expect(service.updateCompany(id, updates)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"There isn't any company with id: 0"`,
    );
  });
});
