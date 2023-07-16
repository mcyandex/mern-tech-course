import { Module } from '@nestjs/common';
import { AdminModule } from './users/admin/admin.module';
import { BandManagerModule } from './users/bandmanager/bandmanager.module';
import { GigManagerModule } from './users/gigmanager/gigmanager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AdminModule, BandManagerModule, GigManagerModule, AuthModule, CommonModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'mumerch',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }