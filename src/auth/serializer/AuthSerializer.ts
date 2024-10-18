import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { SignInResponseDTO } from '../auth.service';
import { UserContext } from '../dto/UserContext';

// TODO - this doesn't really do much other than map the same obj back. Could hydrate more data in the deserializer.
// This gets auto inject AFAIK...
@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(
    user: SignInResponseDTO,
    done: (err: Error, user: UserContext) => void,
  ) {
    done(null, { ...user });
  }

  deserializeUser(
    payload: UserContext,
    done: (err: Error, user: UserContext) => void,
  ) {
    console.log("I am deserializing...");
    done(null, payload);
  }
}
