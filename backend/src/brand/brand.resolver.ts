import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Model } from 'src/model/entities/model.entity';
import { ModelService } from 'src/model/model.service';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly modelService: ModelService,
  ) { }

  @Mutation(() => Brand)
  createBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput) {
    return this.brandService.create(createBrandInput);
  }

  @Query(() => Brand, { name: 'brand' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.brandService.findOne(id)
  }

  @Query(() => [Brand], { name: 'brands' })
  findAll(@Args('name', { type: () => String, nullable: true }) name?: string) {
    return this.brandService.findAll(name);
  }

  @ResolveField('models', () => [Model])
  async models(@Parent() brand: Brand) {
    const { id } = brand
    return this.modelService.findByBrandId(id)
  }


  // @Query(() => Brand, { name: 'brand' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.brandService.findOne(id);
  // }

  @Mutation(() => Brand)
  updateBrand(@Args('updateBrandInput') updateBrandInput: UpdateBrandInput) {
    return this.brandService.update(updateBrandInput.id, updateBrandInput);
  }

  @Mutation(() => Brand)
  removeBrand(@Args('id', { type: () => Int }) id: number) {
    return this.brandService.remove(id);
  }
}
