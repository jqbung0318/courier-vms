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
    createdAt: z.date(),
    updatedAt: z.date(),
})

const CreateVehicleFormSchema = VehicleFormSchema.omit({ id: true, createdAt: true, updatedAt: true })
const UpdateVehicleFormSchema = VehicleFormSchema.omit({ createdAt: true, updatedAt: true })

const MaintenanceRecordFormSchema = z.object({
    id: z.number(),
    vehicleId: z.number(),
    scheduledAt: z.coerce.date({ required_error: "Missing scheduled time" }),
    maintainedAt: z.coerce.date(),
    mileage: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    remarks: z.string(),
})

const CreateMaintenanceRecordFormSchema = MaintenanceRecordFormSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial({ maintainedAt: true, mileage: true, remarks: true })
const UpdateMaintenanceRecordFormSchema = MaintenanceRecordFormSchema.omit({ createdAt: true, updatedAt: true }).partial({ maintainedAt: true, mileage: true, remarks: true })


export {
    CreateVehicleFormSchema,
    UpdateVehicleFormSchema,
    CreateMaintenanceRecordFormSchema,
    UpdateMaintenanceRecordFormSchema,
}