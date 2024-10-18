import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TodolistService } from './todolist.service';
import { SharingService } from '../sharing/sharing.service';

// TODO - need to impl all of the below

// TODO - Need to add auth guard here at class level
// TODO - need to impl a guard that checks if a user can access a todolist based on owner an sharing criteria
@Controller('todolist')
export class TodolistController {
  constructor(
    private readonly userService: UserService,
    private readonly todolistService: TodolistService,
    private readonly shareService: SharingService,
  ) {}

  @Get('all')
  async getAllTodolists() {}

  @Get(':id')
  async getTodolist() {}

  @Post(':id/update')
  async updateTodolist() {}

  @Post(':id/share')
  async shareTodolist() {}

  @Get(':id/item/:itemId')
  async getTodolistItem() {}

  @Post(':id/item/:itemId')
  async updateTodolistItem() {}
}
