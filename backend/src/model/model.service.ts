import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehicleModel } from '@prisma/client';

@Injectable()
export class ModelService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createModelInput: CreateModelInput): Promise<VehicleModel> {
    const model = this.prisma.vehicleModel.create({
      data: createModelInput
    })

    return model;
  }

  async find(
    searchString?: string,
  ): Promise<VehicleModel[] | null> {
    const query = searchString === null ? null : {
      where: {
        name: { contains: searchString }
      }
    }

    return this.prisma.vehicleModel.findMany(query)
  }

  async findByBrandId(id: number): Promise<VehicleModel[] | null> {
    return this.prisma.vehicleModel.findMany({
      where: { vehicleBrandId: id }
    })
  }

  async update(id: number, updateModelInput: UpdateModelInput): Promise<VehicleModel | null> {
    const model = this.prisma.vehicleModel.findUnique({ where: { id } })

    if (model === null) {
      throw new HttpException("Model not found", HttpStatus.NOT_FOUND)
    }

    const newModel = this.prisma.vehicleModel.update({
      where: { id },
      data: updateModelInput
    })

    return newModel
  }

  async remove(id: number): Promise<boolean> {
    const ok = this.prisma.vehicleModel.delete({
      where: { id }
    })

    return true
  }
}
