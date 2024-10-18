import { Module } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { SharingRepository } from './SharingRepository';

@Module({
  providers: [SharingService, SharingRepository],
  exports: [SharingService],
})
export class SharingModule {}
