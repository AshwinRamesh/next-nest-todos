import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserContext } from './dto/UserContext';
import { CreateUserDTO } from '../user/dto/CreateUserRequest';
import { UserDTO } from '../user/dto/UserDTO';

export class SignInDTO {
  username: string;
  password: string;
}

export class SignInResponseDTO {
  id: number;
  username: string;
  name: string;
  access_token?: string;
}

export interface AuthServiceInterface {
  validateUser(ctx: UserContext, data: SignInDTO): Promise<SignInResponseDTO>;
  registerUser(ctx: UserContext, data: CreateUserDTO): Promise<UserDTO>;
}

export class AuthServiceLocalClient implements AuthServiceInterface {
  constructor(readonly service: AuthService) {}

  async validateUser(
    ctx: UserContext,
    data: SignInDTO,
  ): Promise<SignInResponseDTO> {
    return this.service.validateUser(ctx, data);
  }

  async registerUser(ctx: UserContext, data: CreateUserDTO): Promise<UserDTO> {
    return this.service.registerUser(ctx, data);
  }
}

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    ctx: UserContext,
    data: SignInDTO,
  ): Promise<SignInResponseDTO> {
    const checkPassword = await this.userService.checkPassword(ctx, data);
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getUser(ctx, data.username);
    return { name: user.name, username: user.username, id: user.id };
  }

  async registerUser(ctx: UserContext, data: CreateUserDTO) {
    return this.userService.createUser(ctx, data);
  }

  async signInWithJWT(
    ctx: UserContext,
    data: SignInDTO,
  ): Promise<SignInResponseDTO> {
    const payload = this.validateUser(ctx, data);
    return {
      ...payload,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
