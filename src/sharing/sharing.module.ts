import { Module } from '@nestjs/common';
import { SharingRepository } from './SharingRepository';
import { SharingService } from './service/SharingService';
import { SharingServiceLocalClient } from './service/SharingServiceClient';

@Module({
  providers: [SharingService, SharingRepository, SharingServiceLocalClient],
  exports: [SharingServiceLocalClient],
})
export class SharingModule {}
