import { UserContext } from 'src/auth/dto/UserContext';
import {
  ShareTodolistRequest,
  CheckIfSharedRequest,
  GetAllSharedTodolistsRequest,
  GetAllSharedTodolistsResponse,
} from '../dto/SharingDTO';
import { SharingServiceInterface } from './SharingServiceInterface';
import { SharingService } from './SharingService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SharingServiceLocalClient implements SharingServiceInterface {
  constructor(readonly service: SharingService) {}

  share(ctx: UserContext, req: ShareTodolistRequest): Promise<void> {
    return this.service.share(ctx, req);
  }
  unshare(ctx: UserContext, req: ShareTodolistRequest): Promise<void> {
    return this.service.unshare(ctx, req);
  }
  checkIfShared(
    ctx: UserContext,
    req: CheckIfSharedRequest,
  ): Promise<{ isShared: boolean }> {
    return this.service.checkIfShared(ctx, req);
  }
  getAllShared(
    ctx: UserContext,
    req: GetAllSharedTodolistsRequest,
  ): Promise<GetAllSharedTodolistsResponse> {
    return this.service.getAllShared(ctx, req);
  }
}
