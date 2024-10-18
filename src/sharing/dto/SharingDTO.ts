export class ShareTodolistRequest {
  constructor(
    readonly todolistId: number,
    readonly userId: number,
  ) {}
}

export class CheckIfSharedRequest {
  constructor(
    readonly todolistId: number,
    readonly userId: number,
  ) {}
}

export class GetAllSharedTodolistsRequest {
  constructor(readonly userId: number) {}
}

export class GetAllSharedTodolistsResponse {
  constructor(readonly todolistIds: number[]) {}
}
