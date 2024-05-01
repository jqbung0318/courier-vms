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
    'ONLINE' = <any>'ONLINE',
    'OFFLINE' = <any>'OFFLINE',
    'MAINTENANCE' = <any>'MAINTENANCE',
}

export enum VehicleType {
    'MOTORCYCLE' = <any>'MOTORCYCLE',
    'CAR' = <any>'CAR',
    'FOURWHEELS' = <any>'FOURWHEELS',
    'VAN' = <any>'VAN',
    'LORRY' = <any>'LORRY',
}