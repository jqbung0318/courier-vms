import { Module, forwardRef } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';
import { BrandModule } from 'src/brand/brand.module';
import { ModelModule } from 'src/model/model.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    forwardRef(() => BrandModule),
    forwardRef(() => ModelModule),
    PrismaModule
  ],
  providers: [VehicleResolver, VehicleService],
  exports: [VehicleService]
})
export class VehicleModule { }
