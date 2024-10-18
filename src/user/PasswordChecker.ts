import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordChecker {
  constructor() {}

  // Returns a hashed password
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // Returns true if input (password) === hashedPassword
  async checkPassword(input: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(input, hashedPassword);
  }
}
