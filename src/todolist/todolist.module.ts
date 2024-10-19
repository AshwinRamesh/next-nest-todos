import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { SharingModule } from '../sharing/sharing.module';
import { UserModule } from '../user/user.module';
import { TodolistRepository } from './TodolistRepository';

@Module({
  providers: [TodolistService, TodolistRepository],
  controllers: [TodolistController],
  imports: [SharingModule, UserModule],
  exports: [TodolistService],
})
export class TodolistModule {}
