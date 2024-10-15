import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    //
    UserModule,
    AuthModule,
    // MikroOrm - this should load from the micro-orm.config file.
    // TODO - need to change based on config + test env
    MikroOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
