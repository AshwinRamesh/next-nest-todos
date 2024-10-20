import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TodolistRepository } from './TodolistRepository';
import { SharingService } from '../sharing/sharing.service';
import { UserService } from '../user/user.service';
import { UNKNOWN_USER, UserContext } from '../auth/dto/UserContext';
import {
  CheckIfSharedRequest,
  GetAllSharedTodolistsRequest,
  ShareTodolistRequest,
} from '../sharing/dto/SharingDTO';
import {
  CreateTodolistItemRequest,
  CreateTodolistRequest,
  ItemDTO,
  TodolistDTO,
  UpdateTodolistItemRequest,
  UpdateTodolistRequest,
} from './dto/TodolistDTO';
import { Todolist } from '../entities/Todolist';
import { TodolistItem } from '../entities/TodoItem';
import { mapItemFromEntity, mapTodolistFromEntity } from './utils';

@Injectable()
export class TodolistService {
  constructor(
    private readonly repository: TodolistRepository,
    private readonly userService: UserService,
    private readonly shareService: SharingService,
  ) {}

  private async checkTodolistAccess(
    ctx: UserContext,
    todolist: Todolist | number,
  ): Promise<boolean> {
    let tl: Todolist;
    if (typeof todolist === 'number') {
      tl = await this._getTodolist(ctx, todolist);
    } else {
      tl = todolist;
    }

    if (tl.creator.id === ctx.id) {
      return true;
    }
    const shareReq = new CheckIfSharedRequest(tl.id, ctx.id);
    return (await this.shareService.checkIfShared(UNKNOWN_USER, shareReq))
      .isShared;
  }

  async createTodolist(ctx: UserContext, req: CreateTodolistRequest) {
    if (ctx.id != req.userId) {
      throw new BadRequestException(
        'Cannot create todolist on behalf of another user.',
      );
    }
    const todolist = await this.repository.createTodolist(
      req.name,
      req.userId,
      req.details,
    );
    return mapTodolistFromEntity(todolist);
  }

  async updateTodolist(ctx: UserContext, req: UpdateTodolistRequest) {
    await this.getTodolistAndCheckAccess(ctx, req.id); // Checks for access
    return mapTodolistFromEntity(
      await this.repository.updateTodolist(
        req.id,
        req.name,
        req.details,
        req.isCompleted,
      ),
    );
  }

  async getTodolist(ctx: UserContext, id: number) {
    const todolist = await this._getTodolist(ctx, id);
    return mapTodolistFromEntity(todolist);
  }

  private async _getTodolist(ctx: UserContext, id: number) {
    const todolist = await this.repository.getTodolist(id);
    if (!todolist) {
      throw new NotFoundException(`Todolist ${id} does not exist`);
    }
    return todolist;
  }

  // Returns todolist if user has access. Otherwise throws error.
  async getTodolistAndCheckAccess(ctx: UserContext, id: number) {
    const todolist = await this._getTodolist(ctx, id);
    const hasAccess = await this.checkTodolistAccess(ctx, todolist);
    if (!hasAccess) {
      throw new ForbiddenException(
        'Cannot edit todolist. You do not have access.',
      );
    }
    return todolist; // TODO - need to map back to another response obj.
  }

  async createItem(ctx: UserContext, req: CreateTodolistItemRequest) {
    // Will error if no access.
    await this.getTodolistAndCheckAccess(ctx, req.todolistId);
    const item = await this.repository.createTodolistItem(
      req.todolistId,
      req.name,
      req.userId,
    );
    return mapItemFromEntity(item);
  }

  async updateItem(ctx: UserContext, req: UpdateTodolistItemRequest) {
    await this.getItem(ctx, req.id); // This will throw error if user does not have access.
    const updatedItem = await this.repository.updateTodolistItem(
      req.id,
      req.name,
      req.details,
      req.isCompleted,
    );
    return updatedItem;
  }

  // Returns item if user has access. Otherwise throws error.
  async getItem(ctx: UserContext, id: number) {
    const item = await this.repository.getTodolistItem(id);
    if (!item) {
      throw new NotFoundException(`Todolist Item ${id} does not exist`);
    }
    await this.getTodolistAndCheckAccess(ctx, item.todolist.id); // TODO - can we just get the id?
    return mapItemFromEntity(item);
  }

  // Todolist can only be shared by the owner.
  async shareTodolist(ctx: UserContext, req: ShareTodolistRequest) {
    const todolist = await this.repository.getTodolist(req.todolistId);

    // This will throw error if user does not exist.
    await this.userService.getUserById(ctx, req.userId);

    if (!todolist) {
      throw new NotFoundException(`Todolist ${req.todolistId} does not exist.`);
    }
    if (todolist.creator.id != ctx.id) {
      throw new UnauthorizedException(`Only owner of todolist can share it.`);
    }
    return await this.shareService.share(ctx, req);
  }

  async unshareTodolist(ctx: UserContext, req: ShareTodolistRequest) {
    const todolist = await this.repository.getTodolist(req.todolistId);

    // This will throw error if user does not exist.
    await this.userService.getUserById(ctx, req.userId);

    if (!todolist) {
      throw new NotFoundException(`Todolist ${req.todolistId} does not exist.`);
    }
    if (todolist.creator.id != ctx.id) {
      throw new UnauthorizedException(`Only owner of todolist can unshare it.`);
    }
    return await this.shareService.unshare(ctx, req);
  }

  async getTodolists(ctx: UserContext) {
    const todolists = await this.repository.getAllTodolistsForUser(ctx.id);
    return todolists.map((tl) => mapTodolistFromEntity(tl));
  }

  async getSharedTodolists(ctx: UserContext) {
    const req = new GetAllSharedTodolistsRequest(ctx.id);
    const res = await this.shareService.getAllShared(ctx, req);
    const todolists = await this.repository.getTodolistsByIds(res.todolistIds);
    return todolists.map((tl) => mapTodolistFromEntity(tl));
  }
}
