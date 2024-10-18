import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Todolist } from './Todolist';
import { User } from './User';

@Entity()
@Unique({ properties: ['todolist', 'shared_to'] })
export class SharedList extends BaseEntity {
  @ManyToOne({ entity: () => Todolist })
  todolist!: Todolist;

  @ManyToOne({ entity: () => User })
  shared_to!: User;

  @Property({ default: true })
  active!: boolean;
}
