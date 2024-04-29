import { Vehicle, VehicleMaintenanceReocrd, VehicleStatus, VehicleType } from "./definitions";

export const vehicleBrands = [
    {
        id: 1,
        name: 'Hyundai'
    },
    {
        id: 2,
        name: 'Honda'
    },
    {
        id: 3,
        name: 'Toyota'
    },
    {
        id: 4,
        name: 'Kia'
    },
    {
        id: 5,
        name: 'Perodua'
    }
]

export const vehicleModels = [
    {
        id: 1,
        name: 'Civic'
    },
    {
        id: 2,
        name: 'Vios'
    },
    {
        id: 3,
        name: 'Optima'
    },
    {
        id: 4,
        name: 'Ioniq'
    },
    {
        id: 5,
        name: 'Camry'
    },
    {
        id: 6,
        name: 'Myvi'
    }
]

export const vehicles: Vehicle[] = [
    {
        id: 1,
        plateNo: "AMK8268",
        nickname: "AMK8268 - Wangsa Maju",
        vehicleBrandId: 2,
        vehicleModelId: 1,
        type: VehicleType.CAR,
        status: VehicleStatus.ONLINE,
    },
    {
        id: 2,
        plateNo: "BMK8268",
        nickname: "BMK8268 - Dengkil",
        vehicleBrandId: 1,
        vehicleModelId: 4,
        type: VehicleType.CAR,
        status: VehicleStatus.OFFLINE,
    },
    {
        id: 3,
        plateNo: "CMK8268",
        nickname: "CMK8268 - - Wangsa Maju",
        vehicleBrandId: 4,
        vehicleModelId: 3,
        type: VehicleType.MOTORCYCLE,
        status: VehicleStatus.ONLINE,
    },
    {
        id: 4,
        plateNo: "DMK8268",
        nickname: "DMK8268 - Kepong",
        vehicleBrandId: 3,
        vehicleModelId: 2,
        type: VehicleType.FOURWHEELS,
        status: VehicleStatus.ONLINE,
    },
    {
        id: 5,
        plateNo: "EMK8268",
        nickname: "EMK8268 - Dengkil",
        vehicleBrandId: 3,
        vehicleModelId: 5,
        type: VehicleType.VAN,
        status: VehicleStatus.MAINTENANCE,
    },
    {
        id: 6,
        plateNo: "FMK8268",
        nickname: "FMK8268 - Kepong",
        vehicleBrandId: 5,
        vehicleModelId: 6,
        type: VehicleType.LORRY,
        status: VehicleStatus.OFFLINE,
    },
    {
        id: 7,
        plateNo: "GMK8268",
        nickname: "GMK8268 - Wangsa Maju",
        vehicleBrandId: 2,
        vehicleModelId: 5,
        type: VehicleType.CAR,
        status: VehicleStatus.MAINTENANCE,
    }
]

export const maintenanceRecords: VehicleMaintenanceReocrd[] = [
    {
        id: 1,
        vehicleId: 1,
        scheduledAt: new Date('2024-04-26T00:00:00Z'),
        maintainedAt: new Date('2024-04-28T10:20:30Z'),
        mileage: 1000,
    },
    {
        id: 2,
        vehicleId: 1,
        scheduledAt: new Date('2024-05-28T00:00:00Z'),
        mileage: 1000,
    },
    {
        id: 3,
        vehicleId: 2,
        scheduledAt: new Date('2024-04-24T00:00:00Z'),
    },
    {
        id: 4,
        vehicleId: 3,
        scheduledAt: new Date('2024-04-24T00:00:00Z'),
        maintainedAt: new Date('2024-04-26T10:20:30Z'),
        mileage: 1000,
    },
    {
        id: 5,
        vehicleId: 3,
        scheduledAt: new Date('2024-05-26T00:00:00Z'),
    },
    {
        id: 6,
        vehicleId: 4,
        scheduledAt: new Date('2024-04-24T00:00:00Z'),
    },
    {
        id: 7,
        vehicleId: 5,
        scheduledAt: new Date('2024-04-24T00:00:00Z'),
    },
    {
        id: 8,
        vehicleId: 6,
        scheduledAt: new Date('2024-04-24T00:00:00Z'),
    },
    {
        id: 9,
        vehicleId: 7,
        scheduledAt: new Date('2024-04-24T00:00:00Z'),
    },
]