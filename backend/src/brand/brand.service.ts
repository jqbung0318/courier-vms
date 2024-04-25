import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Prisma, VehicleBrand } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createBrandInput: CreateBrandInput): Promise<VehicleBrand> {
    const brand = this.prisma.vehicleBrand.create({
      data: createBrandInput
    })

    return brand
  }

  async getByBrandId(
    id: number
  ): Promise<VehicleBrand | null> {
    return this.prisma.vehicleBrand.findUnique({ where: { id } })
  }

  async find(
    searchString?: string,
  ): Promise<VehicleBrand[] | null> {
    const query = searchString === null ? null : {
      where: {
        name: { contains: searchString }
      }
    }

    return this.prisma.vehicleBrand.findMany(query)
  }

  async update(
    id: number, updateBrandInput: UpdateBrandInput
  ): Promise<VehicleBrand | null> {
    const brand = this.prisma.vehicleBrand.findUnique({ where: { id } })

    if (brand === null) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND)
    }

    const newBrand = this.prisma.vehicleBrand.update({
      where: { id },
      data: updateBrandInput
    })

    return newBrand
  }

  async remove(id: number): Promise<boolean> {
    const ok = this.prisma.vehicleBrand.delete({
      where: { id }
    })

    return true
  }
}
