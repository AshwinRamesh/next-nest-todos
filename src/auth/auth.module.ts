import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserService,
    JwtModule.register({
      global: true,
      secret: "This is a secret", // TODO - move into config
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
