import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/LocalStrategy';
import { AuthSerializer } from './serializer/AuthSerializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AuthSerializer],
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      global: true,
      secret: 'This is a secret', // TODO - move into config
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
