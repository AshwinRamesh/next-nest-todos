import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PasswordChecker } from './PasswordChecker';
import { UserContext } from '../auth/dto/UserContext';
import { CreateUserDTO } from './dto/CreateUserRequest';
import { UserDTO } from './dto/UserDTO';
import { CheckPasswordDTO } from './dto/CheckPasswordRequest';
import { UpdateUserRequest } from './dto/UpdateUserRequest';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly passwordChecker: PasswordChecker,
  ) {}

  // TODO - how can we do all of this within one transaction?
  async createUser(ctx: UserContext, data: CreateUserDTO): Promise<UserDTO> {
    // Check username doesn't exist
    const userExists = await this.repository.checkUsernameExists(data.username);
    if (userExists === true) {
      throw new BadRequestException(
        `Username ${data.username} already exists.`,
      );
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

  async checkPassword(
    ctx: UserContext,
    data: CheckPasswordDTO,
  ): Promise<boolean> {
    console.log(data);
    const user = await this.repository.getUser(data.username);
    if (!user) {
      return false;
    }
    const passwordMatches = await this.passwordChecker.checkPassword(
      data.password,
      user.hashed_password,
    );
    return passwordMatches;
  }

  // Will return null if user does not exist.
  async getUser(ctx: UserContext, username: string): Promise<UserDTO | null> {
    return this.repository.getUser(username);
  }

  async updateUser(ctx: UserContext, data: UpdateUserRequest) {
    const user = this.repository.updateUser(data.username, data.name);
    if (user) {
      return user;
    }
    throw new BadRequestException('Could not update user.');
  }
}
