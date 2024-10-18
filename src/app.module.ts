import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RedisModule } from './redis/redis.module';
import { ExperimentsModule } from './experiments/experiments.module';
import { TodolistModule } from './todolist/todolist.module';
import { SharingModule } from './sharing/sharing.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    // TODO - need to change based on config + test env
    MikroOrmModule.forRoot(),
    RedisModule,
    ExperimentsModule,
    TodolistModule,
    SharingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
