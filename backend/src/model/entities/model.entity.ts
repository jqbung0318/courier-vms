import { ObjectType, Field, Int } from '@nestjs/graphql';
import { VehicleModel } from '@prisma/client';
import { Brand } from 'src/brand/entities/brand.entity';

@ObjectType()
export class Model implements VehicleModel {
  @Field(() => Int, { description: 'Item ID' })
  id: number;

  @Field(() => Date, { description: 'Item creation date' })
  createdAt: Date;

  @Field(() => Date, { description: 'Item last updated date' })
  updatedAt: Date;

  @Field(() => String, { description: 'Vehicle model name' })
  name: string;

  @Field(() => Brand, { description: "Vehicle brand" })
  brand: Brand;

  @Field(() => Int, { description: 'Vehicle brand ID' })
  vehicleBrandId: number;
}
