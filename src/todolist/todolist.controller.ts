import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TodolistService } from './todolist.service';
import { SharingService } from '../sharing/sharing.service';
import { LoggedInGuard } from '../auth/guard/LoggedInGuard';
import { UpdateUserRequest } from '../user/dto/UpdateUserRequest';
import { UserContext } from '../auth/dto/UserContext';
import {
  CreateTodolistRequest,
  UpdateTodolistRequest,
} from './dto/TodolistDTO';

// TODO - Need to add auth guard here at class level
// TODO - need to impl a guard that checks if a user can access a todolist based on owner an sharing criteria
@Controller('todolist')
export class TodolistController {
  constructor(
    private readonly userService: UserService,
    private readonly todolistService: TodolistService,
    private readonly shareService: SharingService,
  ) {}
  // (@Request() req, @Body() data: UpdateUserRequest) {
  //     const ctx: UserContext = req.user;
  @UseGuards(LoggedInGuard)
  @Get('all')
  async getAllTodolists() {
    // TODO - still need to impl service/repo
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  async getTodolist(@Request() req, @Param('id') id: number) {
    const ctx: UserContext = req.user;
    return await this.todolistService.getTodolist(ctx, id);
  }

  @UseGuards(LoggedInGuard)
  @Post('create')
  async createTodolist(@Request() req, @Body() body: CreateTodolistRequest) {
    const ctx: UserContext = req.user;
    const todolist = await this.todolistService.createTodolist(ctx, body);
    return todolist;
  }

  @UseGuards(LoggedInGuard)
  @Post('update')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateTodolist(@Request() req, @Body() body: UpdateTodolistRequest) {
    const ctx: UserContext = req.user;
    const todolist = await this.todolistService.updateTodolist(ctx, body);
    return todolist;
  }

  @UseGuards(LoggedInGuard)
  @Post(':id/share')
  async shareTodolist() {}

  @UseGuards(LoggedInGuard)
  @Post(':id/unshare')
  async unshareTodolist() {}

  @UseGuards(LoggedInGuard)
  @Get(':id/item/:itemId')
  async getTodolistItem() {}

  @UseGuards(LoggedInGuard)
  @Post(':id/item/:itemId')
  async updateTodolistItem() {}
}
