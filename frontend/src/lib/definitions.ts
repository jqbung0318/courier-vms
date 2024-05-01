export type Vehicle = {
    id: number;
    plateNo: string;
    nickname: string;
    type: VehicleType;
    vehicleBrandId: number;
    brand?: string;
    vehicleModelId: number;
    model?: string;
    status: VehicleStatus;
}

export type VehicleMaintenanceRecord = {
    id: number;
    vehicleId: number;
    plateNo?: string;
    scheduledAt: Date;
    maintainedAt?: Date;
    mileage?: number;
    remarks?: string;
}

export type VehicleBrandsField = {
    id: number;
    name: string;
}

export type VehicleModelsField = {
    id: number;
    name: string;
    vehicleBrandId?: number;
}

export enum VehicleStatus {
    'ONLINE' = 'ONLINE',
    'OFFLINE' = 'OFFLINE',
    'MAINTENANCE' = 'MAINTENANCE',
}

export enum VehicleType {
    'MOTORCYCLE' = 'MOTORCYCLE',
    'CAR' = 'CAR',
    'FOURWHEELS' = 'FOURWHEELS',
    'VAN' = 'VAN',
    'LORRY' = 'LORRY',
}