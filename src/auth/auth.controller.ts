import { Body, Controller, Post, Req, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/user.service';
import { LocalGuard } from './guard/LocalGuard';
import { LoggedInGuard } from './guard/LoggedInGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO - move to user module?
  @Post('register')
  registerUser(@Body() user: CreateUserDTO) {
    return this.authService.registerUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Request() req) {
    return req.user;
  }

  @Post('/logout')
  logoutUser(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }

  @UseGuards(LoggedInGuard)
  @Get('/user')
  getUser(@Request() req): any {
    const user = req.user;
    return user;
  }
}
