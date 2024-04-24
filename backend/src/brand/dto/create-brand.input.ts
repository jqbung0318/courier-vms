import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBrandInput {
  @Field(() => String, { description: 'Vehicle brand name' })
  name: string;
}
