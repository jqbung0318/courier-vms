import { CreateMaintenanceInput } from './create-maintenance.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMaintenanceInput extends PartialType(CreateMaintenanceInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { description: 'Item scheduled maintenance date' })
  scheduledAt: Date;

  @Field(() => Date, { description: 'Item actual maintenance date', nullable: true })
  maintainedAt?: Date;

  @Field(() => Int, { description: 'Vehicle mileage in KM', nullable: true })
  mileage?: number;

  @Field(() => String, { description: 'Additional message in this maintenance', nullable: true })
  remarks?: string;
}
