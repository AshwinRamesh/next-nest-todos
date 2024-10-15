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

  it('create user', async () => {
    const createUserDTO = {
      username: 'user01',
      name: 'User One',
      rawPassword: 'password01',
    };
    const user = await service.createUser(createUserDTO);
    expect(user.name).toEqual('User One');
    expect(user.username).toEqual('user01');

    // Create a second user with different username
    const user2 = await service.createUser({
      username: 'user02',
      name: 'User 2',
      rawPassword: 'diffpass',
    });
    expect(user2.name).toEqual('User 2');
    expect(user2.username).toEqual('user02');

    // Try create a third user with same username as user01
    await expect(service.createUser(createUserDTO)).rejects.toThrow(
      'Username user01 already exists.',
    );
  });
});
