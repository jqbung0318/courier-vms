import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { $Enums, Vehicle, VehicleStatus, VehicleType } from '@prisma/client';

registerEnumType(VehicleType, {
  name: 'VehicleType'
})

registerEnumType(VehicleStatus, {
  name: 'VehicleStatus'
})

@ObjectType()
export class VehicleObjectType implements Vehicle {
  @Field(() => Int, { description: 'Item ID' })
  id: number;

  @Field(() => Date, { description: 'Item creation date' })
  createdAt: Date;

  @Field(() => Date, { description: 'Item last updated date' })
  updatedAt: Date;

  @Field(() => String, { description: 'Vehicle Plate' })
  plateNo: string;

  @Field(() => String, { nullable: true, description: 'Vehicle Nickname' })
  nickname: string;

  @Field(() => VehicleType)
  type: VehicleType;

  @Field(() => Int, { description: 'Vehicle brand ID' })
  vehicleBrandId: number;

  @Field(() => Int, { description: 'Vehicle model ID' })
  vehicleModelId: number;

  @Field(() => VehicleStatus, { nullable: true })
  status: VehicleStatus;
}

