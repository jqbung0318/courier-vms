import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMaintenanceInput {
  @Field(() => Int, { description: 'Vehicle ID' })
  vehicleId: number;

  @Field(() => Date, { description: 'Item scheduled maintenance date' })
  scheduledAt: Date;

  @Field(() => Date, { description: 'Item actual maintenance date', nullable: true })
  maintainedAt?: Date;

  @Field(() => Int, { description: 'Vehicle mileage in KM', nullable: true })
  mileage?: number;

  @Field(() => String, { description: 'Additional message in this maintenance', nullable: true })
  remarks?: string;
}
