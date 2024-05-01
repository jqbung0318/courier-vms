import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehicleObjectType } from './entities/vehicle.entity';
import { Vehicle } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) { }

  async create(createVehicleInput: CreateVehicleInput): Promise<VehicleObjectType | null> {
    const vehicle = this.prisma.vehicle.create({
      data: createVehicleInput
    })

    return vehicle
  }

  async getByVehicleId(id: number): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({ where: { id } })
  }

  async find(
    searchString?: string
  ): Promise<Vehicle[] | null> {
    const query = searchString === null ? null : {
      where: {
        plateNo: { contains: searchString },
        nickname: { contains: searchString }
      }
    }

    return this.prisma.vehicle.findMany(query)
  }

  async update(id: number, updateVehicleInput: UpdateVehicleInput): Promise<Vehicle | null> {
    const vehicle = this.prisma.vehicle.findUnique({ where: { id } })

    if (vehicle === null) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND)
    }

    const newVehicle = this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleInput
    })

    return newVehicle
  }

  async remove(id: number): Promise<Vehicle | null> {
    const vehicle = this.prisma.vehicle.delete({
      where: { id }
    })

    return vehicle
  }
}
