import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { SignInResponseDTO } from '../auth.service';

// Object that is stored in session.
type Role = 'USER' | 'ADMIN' | 'UNKNOWN';

// Class that represents a user who is making the request. This should be passed to most service calls.
export class UserSession {
  id: number;
  username: string;
  name: string;
  role?: Role;

  constructor(id: number, username: string, name: string, role?: Role) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.role = role;
  }
}

// Singleton representing a user who is not authorised.
export const UNKNOWN_USER = new UserSession(
  0,
  'UNKNOWN_USER',
  'Unknown User',
  'UNKNOWN',
);

// TODO - this doesn't really do much other than map the same obj back. Could hydrate more data in the deserializer.
// This gets auto inject AFAIK...
@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(
    user: SignInResponseDTO,
    done: (err: Error, user: UserSession) => void,
  ) {
    done(null, { ...user });
  }

  deserializeUser(
    payload: UserSession,
    done: (err: Error, user: UserSession) => void,
  ) {
    done(null, payload);
  }
}
