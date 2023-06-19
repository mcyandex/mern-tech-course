import { Module } from '@nestjs/common';
import { GigManagerService } from 'src/models/gigManager/gigManager.service';

@Module({
  imports: [],
  controllers: [GigManagerModule],
  providers: [GigManagerService],
})
export class GigManagerModule {}