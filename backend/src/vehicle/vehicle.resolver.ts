import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { VehicleObjectType } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { Brand } from 'src/brand/entities/brand.entity';
import { BrandService } from 'src/brand/brand.service';
import { ModelService } from 'src/model/model.service';
import { Model } from 'src/model/entities/model.entity';

@Resolver(() => VehicleObjectType)
export class VehicleResolver {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly brandService: BrandService,
    private readonly modelService: ModelService
  ) { }

  @Mutation(() => VehicleObjectType)
  createVehicle(@Args('createVehicleInput') createVehicleInput: CreateVehicleInput) {
    return this.vehicleService.create(createVehicleInput);
  }

  @Query(() => [VehicleObjectType], { name: 'vehicles' })
  findAll(@Args('name', { type: () => String, nullable: true }) name?: string) {
    return this.vehicleService.find(name);
  }

  @Query(() => VehicleObjectType, { name: 'vehicle' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.getByVehicleId(id);
  }

  @ResolveField('brand', () => Brand)
  async brand(@Parent() vehicle: VehicleObjectType) {
    const { vehicleBrandId } = vehicle
    return this.brandService.getByBrandId(vehicleBrandId)
  }

  @ResolveField('model', () => Model)
  async model(@Parent() vehicle: VehicleObjectType) {
    const { vehicleModelId } = vehicle
    return this.modelService.getByModelId(vehicleModelId)
  }

  @Mutation(() => VehicleObjectType)
  updateVehicle(@Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput) {
    return this.vehicleService.update(updateVehicleInput.id, updateVehicleInput);
  }

  @Mutation(() => VehicleObjectType)
  removeVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.remove(id);
  }
}
