import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from '../auth/guard/LoggedInGuard';
import { UpdateUserRequest } from './dto/UpdateUserRequest';
import { UserContext } from '../auth/dto/UserContext';
import { UserService } from './user.service';
import { UserDTO } from './dto/UserDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Update the currently logged in user.
  @UseGuards(LoggedInGuard)
  @Post('update')
  async updateUser(@Request() req, @Body() data: UpdateUserRequest) {
    const ctx: UserContext = req.user;
    if (data.username != ctx.username) {
      throw new BadRequestException(
        `Cannot update a user who is not yourself. You: ${ctx.username} Updating user: ${data.username}`,
      );
    }

    const user = await this.userService.updateUser(ctx, data);
    return UserDTO.fromUser(user);
  }

  // TODO - create getUser endpoint
  // TODO - after update, the cookie has stale data.. How do I invalidate or otherwise?
}
