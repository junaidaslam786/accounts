import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';

import { CompanyController } from './company.controller';
import { Company } from '../entities/company.entity';
import { UserService } from '../services/user.service';

describe('Company Controller', () => {
  let controller: CompanyController;
  let mockedUserService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
    })
      .useMocker(token => {
        if (Object.is(token, UserService)) {
          return createMock<UserService>();
        }
      })
      .compile();

    controller = module.get<CompanyController>(CompanyController);
    mockedUserService = module.get<UserService, jest.Mocked<UserService>>(
      UserService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a company', async () => {
    await expect(controller.get(1)).resolves.toBeDefined();
  });

  it('should update a company', async () => {
    const updatesCompany = {
      name: 'Tech Innovators',
    };

    mockedUserService.updateCompany.mockResolvedValueOnce(
      createMock<Company>({ name: updatesCompany.name }),
    );

    await expect(controller.update(1, updatesCompany)).resolves.toBeDefined();
  });
});
