import { Module } from '@nestjs/common';
import { AdminModule } from './users/admin/admin.module';
import { BandManagerModule } from './users/bandmanager/bandmanager.module';
import { GigManagerModule } from './users/gigmanager/gigmanager.module';
import { EmployeeModule } from './users/employee/employee.module';

@Module({
  imports: [AdminModule, EmployeeModule,BandManagerModule, GigManagerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
