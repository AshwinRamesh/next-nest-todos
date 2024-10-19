import { Injectable } from '@nestjs/common';
import { EnsureRequestContext, EntityManager } from '@mikro-orm/core';
import { User } from '../entities/User';

export class CreateUserRequest {
  name: string;
  username: string;
  hashedPassword: string;
}

export class CreateUserResponse {
  id: number;
  name: string;
  username: string;
}

@Injectable()
export class UserRepository {
  constructor(private readonly em: EntityManager) {}

  async createUser(req: CreateUserRequest): Promise<User> {
    const user = new User(req.username, req.name, req.hashedPassword);
    await this.em.persist(user).flush();
    return user;
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const existingUserCount = await this.em.count(User, {
      username: username,
    });
    if (existingUserCount > 0) {
      return true;
    }
    return false;
  }

  @EnsureRequestContext()
  async getUser(username: string): Promise<User | null> {
    return await this.em.findOne(User, {
      username: username,
    });
  }

  // Will return null if user does not exist
  async updateUser(username: string, name: string): Promise<User | null> {
    const user = await this.getUser(username);
    if (!user) {
      return null;
    }

    // Update name and flush.
    user.name = name;
    await this.em.persist(user).flush();
    return user;
  }

  async getUserById(userId: number) {
    return await this.em.findOne(User, userId);
  }
}
