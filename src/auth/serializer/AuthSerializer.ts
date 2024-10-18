import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { SignInResponseDTO } from '../auth.service';
import { UserContext } from '../dto/UserContext';
import { UserService } from '../../user/user.service';
import { UserDTO } from '../../user/dto/UserDTO';

// TODO - this doesn't really do much other than map the same obj back. Could hydrate more data in the deserializer.
// This gets auto inject AFAIK...
@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(
    user: SignInResponseDTO,
    done: (err: Error, user: UserContext) => void,
  ) {
    done(null, { ...user });
  }

  async deserializeUser(
    payload: UserContext,
    done: (err: Error, user: UserDTO) => void,
  ) {
    // TODO - can we cache this?
    const user = await this.userService.getUser(payload, payload.username);
    done(null, user);
  }
}
