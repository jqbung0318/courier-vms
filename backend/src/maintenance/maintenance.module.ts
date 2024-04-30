import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceResolver } from './maintenance.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports: [PrismaModule, VehicleModule],
  providers: [MaintenanceResolver, MaintenanceService],
})
export class MaintenanceModule { }
