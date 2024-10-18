import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { SharingModule } from '../sharing/sharing.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [TodolistService],
  controllers: [TodolistController],
  imports: [SharingModule, UserModule],
  exports: [TodolistService],
})
export class TodolistModule {}
