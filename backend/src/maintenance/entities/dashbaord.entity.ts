import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SummaryObjectType {
    @Field(() => Int, { description: 'Total vehicles in the system' })
    vehicleCount: number;

    @Field(() => Int, { description: 'Total vehicles active and ready to run' })
    activeVehicleCount: number;

    @Field(() => Int, { description: 'Total vehicles in maintenance state' })
    maintenanceVehicleCount: number;
}