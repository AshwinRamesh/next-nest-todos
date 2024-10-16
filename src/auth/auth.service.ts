import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

export class SignInDTO {
  username: string;
  password: string;
}

export class SignInResponseDTO {
  id: number;
  username: string;
  name: string;
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDTO): Promise<SignInResponseDTO> {
    const checkPassword = await this.userService.checkPassword(data);
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getUser(data.username);
    const payload = { name: user.name, username: user.username, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      ...payload,
    };
  }

  // TODO
  async signOut() {}
}
