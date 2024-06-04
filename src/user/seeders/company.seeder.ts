import { type DataSource } from 'typeorm';
import { Seeder, type SeederFactoryManager } from 'typeorm-extension';
import { Company } from '../entities/company.entity';
import { User } from '../entities/user.entity';

export class CompanySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const companyFactory = factoryManager.get(Company);

    const user1 = await userRepository.findOneOrFail({ where: { email: 'john@doe.me' } });
    const user2 = await userRepository.findOneOrFail({ where: { email: 'jane@doe.me' } });

    await companyFactory.save({
      name: 'Tech Solutions',
      address: '123 Tech Street, Silicon Valley, CA',
      industry: 'Technology',
      user: user1,
    });

    await companyFactory.save({
      name: 'Business Corp',
      address: '456 Business Road, New York, NY',
      industry: 'Finance',
      user: user2,
    });
  }
}
