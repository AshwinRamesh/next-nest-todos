import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PasswordChecker } from './PasswordChecker';

@Module({
  providers: [UserService, UserRepository, PasswordChecker],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
