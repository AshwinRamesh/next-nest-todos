import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoggedInGuard } from '../auth/guard/LoggedInGuard';

@Controller('user')
export class UserController {
  // TODO - impl
  @UseGuards(LoggedInGuard)
  @Post('update')
  async updateuser(@Request() req) {
    return {
      message: 'UPDATE USER - STUB',
      user: req.user,
    };
  }
}
