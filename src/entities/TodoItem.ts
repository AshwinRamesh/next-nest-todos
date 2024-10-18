import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Todolist } from './Todolist';
import { User } from './User';

@Entity()
export class TodolistItem extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  details?: string;

  @Property({ default: false }) // TODO - default?
  isCompleted: boolean;

  @ManyToOne({ entity: () => Todolist })
  todolist!: Todolist;

  @ManyToOne({ entity: () => User })
  creator!: User;
}
