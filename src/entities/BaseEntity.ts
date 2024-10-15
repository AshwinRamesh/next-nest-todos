import { Opt, PrimaryKey, Property } from '@mikro-orm/core';

// TODO - Add a uuid field which is prefixed with identifier char

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}