import { Module } from '@nestjs/common';
import * as Redis from 'redis';

export const REDIS = Symbol('AUTH:REDIS');

// Shared Redis module
// TODO - make this per actual module eventually.
// TODO - check whether this connects. Url may be wrong.
@Module({
  providers: [
    {
      provide: REDIS,
      useValue: Redis.createClient({ url: 'redis://localhost:6379' }), // TODO - move into config
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
