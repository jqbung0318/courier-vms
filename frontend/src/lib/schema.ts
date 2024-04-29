import { z } from "zod"
import { VehicleStatus, VehicleType } from "./definitions"

const VehicleFormSchema = z.object({
    id: z.number(),
    plateNo: z.string(),
    nickname: z.string(),
    type: z.nativeEnum(VehicleType),
    // type: z.enum(['Motorcycle', 'Car', 'FourWheels', 'Van', 'Lorry']),
    vehicleBrandId: z.number(),
    vehicleModelId: z.number(),
    status: z.nativeEnum(VehicleStatus),
    // status: z.enum(['online', 'offline', 'maintenance']),
    createdAt: z.string(),
    updatedAt: z.string(),
})

const CreateVehicleFormSchema = VehicleFormSchema.omit({ id: true, createdAt: true, updatedAt: true })
const UpdateVehicleFormSchema = VehicleFormSchema.omit({ id: true, createdAt: true, updatedAt: true })

const MaintenanceRecordFormSchema = z.object({
    id: z.number(),
    vehicleId: z.number(),
    scheduledAt: z.date(),
    maintainedAt: z.date(),
    mileage: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

const CreateMaintenanceRecordFormSchema = MaintenanceRecordFormSchema.omit({ id: true, createdAt: true, updatedAt: true })

export {
    CreateVehicleFormSchema,
    UpdateVehicleFormSchema,
    CreateMaintenanceRecordFormSchema,
}