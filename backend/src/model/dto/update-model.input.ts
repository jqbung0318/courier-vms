import { CreateModelInput } from './create-model.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateModelInput extends PartialType(CreateModelInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  vehicleBrandId?: number;
}
