import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { TodolistItem } from './TodoItem';

@Entity()
export class Todolist extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  details?: string;

  @Property({ default: false }) // TODO - default?
  isCompleted: boolean;

  @OneToMany(() => TodolistItem, (item) => item.todolist)
  items = new Collection<TodolistItem>(this);

  @ManyToOne({ entity: () => User })
  creator: User;

  constructor(name: string, creator: User, details?: string) {
    super();
    this.name = name;
    this.creator = creator;
    if (details) {
      this.details = details;
    }
  }
}
