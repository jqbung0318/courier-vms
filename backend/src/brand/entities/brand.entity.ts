import { ObjectType, Field, Int } from '@nestjs/graphql';
import { VehicleBrand } from '@prisma/client';
import { Model } from 'src/model/entities/model.entity';

@ObjectType()
export class Brand implements VehicleBrand {

  @Field(() => Int, { description: 'Item ID' })
  id: number;

  @Field(() => Date, { description: 'Item creation date' })
  createdAt: Date;

  @Field(() => Date, { description: 'Item last updated date' })
  updatedAt: Date;

  @Field(() => String, { description: 'Vehicle brand name' })
  name: string;

  @Field(() => [Model], { description: "Vehicle models" })
  models: Model[]
}
