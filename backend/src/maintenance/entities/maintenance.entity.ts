import { ObjectType, Field, Int } from '@nestjs/graphql';
import { VehicleMaintenaceRecord } from '@prisma/client';
import { VehicleObjectType } from 'src/vehicle/entities/vehicle.entity';

@ObjectType()
export class MaintenanceObjectType implements VehicleMaintenaceRecord {
  @Field(() => Int, { description: 'Item ID' })
  id: number;

  @Field(() => Date, { description: 'Item creation date' })
  createdAt: Date;

  @Field(() => Date, { description: 'Item last updated date' })
  updatedAt: Date;

  @Field(() => Int, { description: 'Vehicle ID' })
  vehicleId: number;

  @Field(() => Date, { description: 'Item scheduled maintenance date' })
  scheduledAt: Date;

  @Field(() => Date, { description: 'Item actual maintenance date', nullable: true })
  maintainedAt: Date;

  @Field(() => Int, { description: 'Vehicle mileage in KM', nullable: true })
  mileage: number;

  @Field(() => String, { description: 'Additional message in this maintenance', nullable: true })
  remarks: string;
}
