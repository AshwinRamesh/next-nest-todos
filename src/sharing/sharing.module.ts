import { Module } from '@nestjs/common';
import { SharingService } from './sharing.service';

@Module({
  providers: [SharingService]
})
export class SharingModule {}
