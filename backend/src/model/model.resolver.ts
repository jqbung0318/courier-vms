import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ModelService } from './model.service';
import { Model } from './entities/model.entity';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { Brand } from 'src/brand/entities/brand.entity';
import { BrandService } from 'src/brand/brand.service';

@Resolver(() => Model)
export class ModelResolver {
  constructor(
    private readonly modelService: ModelService,
    private readonly brandService: BrandService
  ) { }

  @Mutation(() => Model)
  createModel(@Args('createModelInput') createModelInput: CreateModelInput) {
    return this.modelService.create(createModelInput);
  }

  @Query(() => [Model], { name: 'models' })
  async find(@Args('name', { type: () => String, nullable: true }) name?: string) {
    return this.modelService.find(name);
  }

  @ResolveField('brand', () => Brand)
  async brand(@Parent() model: Model) {
    const { vehicleBrandId } = model
    return this.brandService.findOne(vehicleBrandId)
  }

  @Mutation(() => Model)
  updateModel(@Args('updateModelInput') updateModelInput: UpdateModelInput) {
    return this.modelService.update(updateModelInput.id, updateModelInput);
  }

  @Mutation(() => Model)
  removeModel(@Args('id', { type: () => Int }) id: number) {
    return this.modelService.remove(id);
  }
}
