import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateModelInput {
  @Field(() => String, { description: 'Vehicle model name' })
  name: string;

  @Field(() => Int, { description: 'Vehicle brand ID' })
  vehicleBrandId: number;
}
