import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CompanyController } from './controllers/company.controller'; // Update this import
import { UserService } from './services/user.service';
import { IsUserAlreadyExist } from './validators/is-user-already-exist.validator';
import { Company } from './entities/company.entity'; // Update this import

@Module({
  imports: [TypeOrmModule.forFeature([User, Company])], // Update Profile to Company
  controllers: [CompanyController], // Update ProfileController to CompanyController
  providers: [UserService, IsUserAlreadyExist],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
