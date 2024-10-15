import { BaseEntity } from './BaseEntity';
import { Entity, Property, Unique } from '@mikro-orm/core';

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  username!: string;

  @Property()
  name!: string;

  @Property()
  hashed_password!: string;

  constructor(username, name, hashed_password) {
    super();
    this.username = username;
    this.name = name;
    this.hashed_password = hashed_password;
  }
}
