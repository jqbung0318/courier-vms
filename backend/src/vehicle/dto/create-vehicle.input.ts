import { InputType, Int, Field } from '@nestjs/graphql';
import { VehicleStatus, VehicleType } from '@prisma/client';

@InputType()
export class CreateVehicleInput {
  @Field(() => String, { description: 'Vehicle plate number' })
  plateNo: string;

  @Field(() => String, { nullable: true, description: 'Vehicle nickname' })
  nickname?: string;

  @Field(() => VehicleType, { description: 'Vehicle type' })
  type: VehicleType;

  @Field(() => Int, { description: 'Vehicl brand ID' })
  vehicleBrandId: number;

  @Field(() => Int, { description: 'Vehicl model ID' })
  vehicleModelId: number;

  @Field(() => VehicleStatus)
  status: VehicleStatus;
}
