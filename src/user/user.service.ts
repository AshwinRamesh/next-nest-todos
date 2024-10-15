import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PasswordCheckerService } from './password-checker.service';

export class CreateUserDTO {
  readonly username: string;
  readonly rawPassword: string;
  readonly name: string;
}

export class UserDTO {
  readonly id: number;
  readonly username: string;
  readonly name: string;

  constructor(id: number, username: string, name: string) {
    this.id = id;
    this.username = username;
    this.name = name;
  }
}

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly passwordChecker: PasswordCheckerService,
  ) {}

  // TODO - how can we do all of this within one transaction?
  async createUser(data: CreateUserDTO): Promise<UserDTO> {
    // Check username doesn't exist
    if ((await this.repository.checkUsernameExists(data.username)) === false) {
      throw Error(`Username ${data.username} already exists.`);
    }

    // Hash password
    // TODO - need to do validation on password length etc.
    // TODO - validation on username length etc.
    const hashedPW = await this.passwordChecker.hashPassword(data.rawPassword);

    // Create user
    const user = await this.repository.createUser({
      username: data.username,
      name: data.name,
      hashedPassword: hashedPW,
    });

    // Return user
    return new UserDTO(user.id, user.username, user.name);
  }
}
