import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTodolistRequest {
  constructor(
    readonly userId: number,
    readonly name: string,
    readonly details?: string,
  ) {}
}

// TODO - need to add decorators to all the classes..
// TODO - unsure what happens when we export this package for NextJS to use with
// TODO(cont) - regards to the decorators.
export class UpdateTodolistRequest {
  @IsInt()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly details?: string;

  @IsOptional()
  @IsBoolean()
  readonly isCompleted?: boolean;

  constructor(
    id: number,
    name?: string,
    details?: string,
    isCompleted?: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.details = details;
    this.isCompleted = isCompleted;
  }
}

export class CreateTodolistItemRequest {
  constructor(
    readonly userId: number,
    readonly todolistId: number,
    readonly name: string,
    readonly details?: string,
  ) {}
}

export class UpdateTodolistItemRequest {
  constructor(
    readonly id: number,
    readonly name?: string,
    readonly details?: string,
    readonly isCompleted?: boolean,
  ) {}
}

export class TodolistDTO {
  constructor(
    readonly id: number,
    readonly creatorId: number,
    readonly name: string,
    readonly details: string | undefined,
    readonly isCompleted: boolean,
    readonly items: ItemDTO[] | null,
  ) {}
}

export class ItemDTO {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly creatorId: number,
    readonly details: string | undefined,
    readonly isCompleted: boolean,
    readonly todolistId: number,
  ) {}
}
