import { Module } from '@nestjs/common';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { CommonService } from './common.service';
import { OrderService } from 'src/models/order/order.service';
import { OrderEntity } from 'src/models/order/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([ OrderEntity ]), MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'team.robust.dev@gmail.com',
          pass: 'exogkkvfdfetegso'
        },
      }
    })
  ],
  controllers: [],
  providers: [CommonService, OrderService],
})
export class CommonModule { }