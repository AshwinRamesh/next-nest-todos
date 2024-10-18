import { Test, TestingModule } from '@nestjs/testing';
import { PasswordChecker } from '../PasswordChecker';

describe('PasswordCheckerService', () => {
  let checker: PasswordChecker;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
    }).compile();

    checker = new PasswordChecker();
  });

  it('checker exists', () => {
    expect(checker).toBeDefined();
  });

  it('passwords are the same', async () => {
    const password = 'PASSWORD1';
    const hashedPassword = await checker.hashPassword(password);
    console.log('First Hash', hashedPassword);
    const checkIfCorrect = await checker.checkPassword(
      password,
      hashedPassword,
    );

    const newHash = await checker.hashPassword(password);
    console.log('Second Hash', newHash);
    const checkIfAlsoCorrect = await checker.checkPassword(password, newHash);

    expect(checkIfAlsoCorrect).toEqual(true);
    expect(checkIfCorrect).toEqual(true);

  });
});
