import { UserContext } from '../../auth/dto/UserContext';
import {
  CheckIfSharedRequest,
  GetAllSharedTodolistsRequest,
  GetAllSharedTodolistsResponse,
  ShareTodolistRequest,
} from '../dto/SharingDTO';

export interface SharingServiceInterface {
  share(ctx: UserContext, req: ShareTodolistRequest): Promise<void>;
  unshare(ctx: UserContext, req: ShareTodolistRequest): Promise<void>;
  checkIfShared(
    ctx: UserContext,
    req: CheckIfSharedRequest,
  ): Promise<{ isShared: boolean }>;
  getAllShared(
    ctx: UserContext,
    req: GetAllSharedTodolistsRequest,
  ): Promise<GetAllSharedTodolistsResponse>;
}
