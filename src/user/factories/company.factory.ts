import { setSeederFactory } from 'typeorm-extension';
import { Company } from '../entities/company.entity';

export const companyFactory = setSeederFactory(Company, faker => {
  const company = new Company();
  company.name = faker.company.name();
  company.address = faker.address.streetAddress();
  company.industry = faker.company.bs();

  return company;
});
