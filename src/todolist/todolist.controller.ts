import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { LoggedInGuard } from '../auth/guard/LoggedInGuard';
import { UserContext } from '../auth/dto/UserContext';
import {
  CreateTodolistItemRequest,
  CreateTodolistRequest,
  ItemDTO,
  UpdateTodolistItemRequest,
  UpdateTodolistRequest,
} from './dto/TodolistDTO';
import { ShareTodolistRequest } from '../sharing/dto/SharingDTO';

// TODO - Need to add auth guard here at class level
// TODO - need to impl a guard that checks if a user can access a todolist based on owner an sharing criteria
@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @UseGuards(LoggedInGuard)
  @Get('all')
  async getAllTodolists(@Request() req) {
    const ctx: UserContext = req.user;
    const [myLists, sharedLists] = await Promise.all([
      this.todolistService.getTodolists(ctx),
      this.todolistService.getSharedTodolists(ctx),
    ]);
    return {
      myTodolists: myLists,
      sharedTodolists: sharedLists,
    };
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
  @Post('share')
  @UsePipes(new ValidationPipe({ transform: true }))
  async shareTodolist(@Request() req, @Body() body: ShareTodolistRequest) {
    const ctx: UserContext = req.user;
    await this.todolistService.shareTodolist(ctx, body);
    return { success: true };
  }

  @UseGuards(LoggedInGuard)
  @Post('unshare')
  @UsePipes(new ValidationPipe({ transform: true }))
  async unshareTodolist(@Request() req, @Body() body: ShareTodolistRequest) {
    const ctx: UserContext = req.user;
    await this.todolistService.unshareTodolist(ctx, body);
    return { success: true };
  }

  @UseGuards(LoggedInGuard)
  @Get('item/:itemId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTodolistItem(
    @Request() req,
    @Param('itemId') itemId: number,
  ): Promise<ItemDTO> {
    const ctx: UserContext = req.user;
    return await this.todolistService.getItem(ctx, itemId);
  }

  @UseGuards(LoggedInGuard)
  @Post('item/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTodolistItem(
    @Request() req,
    @Body() body: CreateTodolistItemRequest,
  ): Promise<ItemDTO> {
    const ctx: UserContext = req.user;
    return this.todolistService.createItem(ctx, body);
  }

  @UseGuards(LoggedInGuard)
  @Post('item/update')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateTodolistItem(
    @Request() req,
    @Body() body: UpdateTodolistItemRequest,
  ) {
    const ctx: UserContext = req.user;
    return this.todolistService.updateItem(ctx, body);
  }

  @UseGuards(LoggedInGuard)
  @Get(':id/items')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllItems(@Request() req, @Param('id') id: number) {
    const ctx: UserContext = req.user;
    return this.todolistService.getTodolistItems(ctx, id);
  }
}
