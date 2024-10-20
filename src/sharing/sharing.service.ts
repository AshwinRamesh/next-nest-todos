import { Injectable } from '@nestjs/common';
import { UserContext } from '../auth/dto/UserContext';
import {
  CheckIfSharedRequest,
  GetAllSharedTodolistsRequest,
  GetAllSharedTodolistsResponse,
  ShareTodolistRequest,
} from './dto/SharingDTO';
import { SharingRepository } from './SharingRepository';

/**
 * Responsible for mapping what entities are shared with other users.
 * Is not responsible for ensuring ACL for whether the sharing is allowed in the first place.
 * This service should only be called from another service that has sharable objects -e.g. Todolist.
 */
@Injectable()
export class SharingService {
  constructor(private readonly shareRepository: SharingRepository) {}

  async share(ctx: UserContext, req: ShareTodolistRequest) {
    await this.shareRepository.share(req.todolistId, req.userId);
  }

  async unshare(ctx: UserContext, req: ShareTodolistRequest) {
    await this.shareRepository.unshare(req.todolistId, req.todolistId);
  }

  async checkIfShared(ctx: UserContext, req: CheckIfSharedRequest) {
    return {
      isShared: await this.shareRepository.isShared(req.todolistId, req.userId),
    };
  }

  async getAllShared(
    ctx: UserContext,
    req: GetAllSharedTodolistsRequest,
  ): Promise<GetAllSharedTodolistsResponse> {
    const sharedLists = await this.shareRepository.getAllShared(req.userId);
    // TODO - why no work.
    console.log(sharedLists);
    return new GetAllSharedTodolistsResponse(sharedLists);
  }
}
