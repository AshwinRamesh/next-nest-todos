export class CreateTodolistRequest {
  constructor(
    readonly userId: number,
    readonly name: string,
    readonly details?: string,
  ) {}
}

export class UpdateTodolistRequest {
  constructor(
    readonly id: number,
    readonly name?: string,
    readonly details?: string,
    readonly isCompleted?: boolean,
  ) {}
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