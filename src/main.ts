import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { REDIS } from './redis/redis.module';
import { RedisClientType } from 'redis';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialise redis session store
  const redisClient: RedisClientType = app.get(REDIS);
  redisClient.connect().catch(console.error); // TODO - can I move this into redis module?

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
  });

  app.use(
    session({
      cookie: {
        maxAge: 60000 * 60,
      }, // TODO - move to config and make secret
      resave: false,
      saveUninitialized: false,
      secret: 'some secret',
      store: redisStore,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Starts listening for shutdown hooks (For MikroORM etc)
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
