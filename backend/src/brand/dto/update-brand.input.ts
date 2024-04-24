import { CreateBrandInput } from './create-brand.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name?: string;
}
