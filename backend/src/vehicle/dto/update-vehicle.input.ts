import { VehicleStatus, VehicleType } from '@prisma/client';
import { CreateVehicleInput } from './create-vehicle.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {
  @Field(() => Int)
  id: number;

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
