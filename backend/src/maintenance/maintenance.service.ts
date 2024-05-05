import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMaintenanceInput } from './dto/create-maintenance.input';
import { UpdateMaintenanceInput } from './dto/update-maintenance.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, VehicleMaintenaceRecord } from '@prisma/client';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) { }

  async create(createMaintenanceInput: CreateMaintenanceInput) {
    const record = await this.prisma.vehicleMaintenaceRecord.create({
      data: createMaintenanceInput
    })

    return record;
  }

  async find(
    searchString?: string
  ): Promise<VehicleMaintenaceRecord[] | null> {
    const ordering = {
      orderBy: {
        updatedAt: Prisma.SortOrder.desc
      }
    }
    const query = searchString === null ? { ...ordering } : {
      where: {
        vehicle: {
          plateNo: { contains: searchString },
        }
      },
      ...ordering
    }

    return this.prisma.vehicleMaintenaceRecord.findMany(query)
    // this.prisma.vehicleMaintenaceRecord.findMany({
    //   where: {
    //     vehicle: {
    //       plateNo: { contains: searchString },
    //     }
    //   },
    //   orderBy: {
    //     updatedAt:
    //   }
    // })
  }

  async getRecordById(id: number): Promise<VehicleMaintenaceRecord | null> {
    return this.prisma.vehicleMaintenaceRecord.findUnique({ where: { id } })
  }

  async update(id: number, updateMaintenanceInput: UpdateMaintenanceInput): Promise<VehicleMaintenaceRecord | null> {
    const record = this.prisma.vehicleMaintenaceRecord.findUnique({ where: { id } })

    if (record === null) {
      throw new HttpException('Recorcd not found', HttpStatus.NOT_FOUND)
    }

    const newRecord = this.prisma.vehicleMaintenaceRecord.update({
      where: { id },
      data: updateMaintenanceInput
    })

    return newRecord
  }

  async remove(id: number): Promise<VehicleMaintenaceRecord | null> {
    const record = this.prisma.vehicleMaintenaceRecord.delete({
      where: { id }
    })

    return record
  }
}
