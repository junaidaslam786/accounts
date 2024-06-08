import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { Contact } from './entities/contact.entity';
import { UserModule } from '../user/user.module'; // Import the UserModule
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    UserModule, // Add UserModule here
    AccountModule,
  ],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
