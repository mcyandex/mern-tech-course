import { Module } from '@nestjs/common';
import { GigManagerController } from './gigmanager.controller';

@Module({
  imports: [],
  controllers: [GigManagerController],
  providers: [],
})
export class GigManagerModule {}