import { User } from '../../entities/User';

export class UserDTO {
  readonly id: number;
  readonly username: string;
  readonly name: string;

  constructor(id: number, username: string, name: string) {
    this.id = id;
    this.username = username;
    this.name = name;
  }

  static fromUser(user: User) {
    return new UserDTO(user.id, user.username, user.name);
  }
}
