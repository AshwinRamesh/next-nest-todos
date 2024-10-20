import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Todolist } from '../entities/Todolist';
import { TodolistItem } from '../entities/TodoItem';
import { User } from '../entities/User';
import { DbError } from '../common/DbUtils';

@Injectable()
export class TodolistRepository {
  constructor(private readonly em: EntityManager) {}

  async createTodolist(
    name: string,
    userId: number,
    details?: string,
  ): Promise<Todolist> {
    const tl = new Todolist(name, this.em.getReference(User, userId), details);
    await this.em.persist(tl).flush();
    return tl;
  }

  // Update todolist by id or throw error if todolist does not exist. Returns the updated todolist.
  async updateTodolist(
    todolistId: number,
    name?: string,
    details?: string,
    isComplete?: boolean,
  ) {
    const todolist = await this.getTodolist(todolistId);
    if (!todolist) {
      throw new DbError(`Todolist "${todolistId}" does not exist.`);
    }
    return this.updateTodolistWithObj(todolist, name, details, isComplete);
  }

  async updateTodolistWithObj(
    todolist: Todolist,
    name?: string,
    details?: string,
    isCompleted?: boolean,
  ): Promise<Todolist> {
    if (name) {
      todolist.name = name;
    }
    if (details) {
      todolist.details = details;
    }
    if (isCompleted != undefined) {
      todolist.isCompleted = isCompleted;
    }
    await this.em.persist(todolist).flush();
    await this.em.refresh(todolist);
    return todolist;
  }

  async getTodolist(todolistId: number): Promise<Todolist | null> {
    const todolist = await this.em.findOne(Todolist, todolistId);
    return todolist || null;
  }

  async getTodolistItem(itemId: number): Promise<TodolistItem | null> {
    const item = await this.em.findOne(TodolistItem, itemId);
    return item || null;
  }

  async createTodolistItem(
    todoListId: number,
    name: string,
    userId: number,
  ): Promise<TodolistItem> {
    const tl = await this.getTodolist(todoListId);
    if (!tl) {
      throw new DbError(`No Todolist with id ${todoListId}`);
    }
    const item = new TodolistItem(name, this.em.getReference(User, userId), tl);
    await this.em.persist(item).flush();
    return item;
  }

  async updateTodolistItem(
    itemId: number,
    name?: string,
    details?: string,
    isCompleted?: boolean,
  ): Promise<TodolistItem> {
    const item = await this.getTodolistItem(itemId);
    if (!item) {
      throw new DbError(`Todolist Item ${itemId} does not exist.`);
    }
    if (name) {
      item.name = name;
    }
    if (details) {
      item.details = details;
    }
    if (isCompleted != undefined) {
      item.isCompleted = isCompleted;
    }
    await this.em.persist(item).flush();
    return item;
  }

  async getAllTodolistsForUser(userId: number) {
    return await this.em.findAll(Todolist, {
      where: {
        creator: this.em.getReference(User, userId),
      },
    });
  }

  async getTodolistsByIds(todolistIds: number[]) {
    return await this.em.findAll(Todolist, {
      where: {
        id: { $in: todolistIds },
      },
    });
  }
}
