import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceObjectType } from './entities/maintenance.entity';
import { CreateMaintenanceInput } from './dto/create-maintenance.input';
import { UpdateMaintenanceInput } from './dto/update-maintenance.input';
import { VehicleObjectType } from 'src/vehicle/entities/vehicle.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Resolver(() => MaintenanceObjectType)
export class MaintenanceResolver {
  constructor(
    private readonly maintenanceService: MaintenanceService,
    private readonly vehicleService: VehicleService,
  ) { }

  @Mutation(() => MaintenanceObjectType)
  createMaintenance(@Args('createMaintenanceInput') createMaintenanceInput: CreateMaintenanceInput) {
    return this.maintenanceService.create(createMaintenanceInput);
  }

  @Query(() => [MaintenanceObjectType], { name: 'maintenances' })
  findAll(@Args('name', { type: () => String, nullable: true }) name?: string) {
    return this.maintenanceService.find(name);
  }

  @Query(() => MaintenanceObjectType, { name: 'maintenance' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.maintenanceService.getRecordById(id);
  }

  @ResolveField('vehicle', () => VehicleObjectType)
  async vehicle(@Parent() record: MaintenanceObjectType) {
    const { vehicleId } = record
    return this.vehicleService.getByVehicleId(vehicleId)
  }

  @Mutation(() => MaintenanceObjectType)
  updateMaintenance(@Args('updateMaintenanceInput') updateMaintenanceInput: UpdateMaintenanceInput) {
    return this.maintenanceService.update(updateMaintenanceInput.id, updateMaintenanceInput);
  }

  @Mutation(() => MaintenanceObjectType)
  removeMaintenance(@Args('id', { type: () => Int }) id: number) {
    return this.maintenanceService.remove(id);
  }
}
