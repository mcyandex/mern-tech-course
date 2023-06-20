import { Module } from '@nestjs/common';
import { GigManagerController } from './gigmanager.controller';
import { GigService } from 'src/models/gig/gig.service';

@Module({
  imports: [],
  controllers: [GigManagerController],
  providers: [GigService],
})
export class GigManagerModule {}