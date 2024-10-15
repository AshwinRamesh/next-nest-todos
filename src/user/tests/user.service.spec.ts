import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { MikroORM } from '@mikro-orm/postgresql';
import { UserRepository } from '../user.repository';
import { PasswordCheckerService } from '../password-checker.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as process from 'node:process';

describe('UserService', () => {
  let service: UserService;
  let orm: MikroORM;

  beforeAll(async () => {
    console.log('ENV IS: ', process.env.NODE_ENV);
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot()],
      providers: [UserService, UserRepository, PasswordCheckerService],
    }).compile();

    service = module.get<UserService>(UserService);
    orm = module.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
