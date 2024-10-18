import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/LocalGuard';
import { LoggedInGuard } from './guard/LoggedInGuard';
import { UNKNOWN_USER, UserContext } from './dto/UserContext';
import { CreateUserDTO } from '../user/dto/CreateUserRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO - move to user module?
  @Post('register')
  registerUser(@Body() user: CreateUserDTO) {
    return this.authService.registerUser(UNKNOWN_USER, user);
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
  getUser(@Request() req): UserContext {
    const user: UserContext = req.user;
    return user;
  }
}
