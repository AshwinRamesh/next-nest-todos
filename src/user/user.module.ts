import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PasswordCheckerService } from './password-checker.service';

@Module({
  providers: [UserService, UserRepository, PasswordCheckerService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
