import { Module } from '@nestjs/common';
import { AdminModule } from './users/admin/admin.module';
import { BandManagerModule } from './users/bandmanager/bandmanager.module';
import { GigManagerModule } from './users/gigmanager/gigmanager.module';
//import { EmployeeModule } from './users/employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './users/common/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [AdminModule, BandManagerModule, GigManagerModule, AuthModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'mumerch',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'team.robust.dev@gmail.com',
          pass: 'vydfgsfgcbfjwetd'
        },
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }