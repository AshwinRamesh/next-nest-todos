// Object that is stored in session.
type Role = 'USER' | 'ADMIN' | 'UNKNOWN';

// Class that represents a user who is making the request. This should be passed to most service calls.
export class UserContext {
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
export const UNKNOWN_USER = new UserContext(
  0,
  'UNKNOWN_USER',
  'Unknown User',
  'UNKNOWN',
);

// TODO - add UNKNOWN_USER to non logged in users
// TODO - need to attach flags/exp
// TODO - need to probably set session variables with flags/exp too.
