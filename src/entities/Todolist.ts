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
  books1 = new Collection<TodolistItem>(this);

  @ManyToOne({ entity: () => User })
  creator: User;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
