export type Vehicle = {
    id: number;
    plateNo: string;
    nickname: string;
    type: VehicleType;
    // type: 'MOTORCYCLE' | 'CAR' | 'FOURWHEELS' | 'VAN' | 'LORRY';
    vehicleBrandId: number;
    vehicleModelId: number;
    status: VehicleStatus
    // status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
}

export type VehicleBrandsField = {
    id: number;
    name: string;
}

export type VehicleModelsField = {
    id: number;
    name: string;
}

export enum VehicleStatus {
    'ONLINE' = "online",
    'OFFLINE' = "offline",
    'MAINTENANCE' = "maintenance"
}

export enum VehicleType {
    'MOTORCYCLE' = "Motorcycle",
    'CAR' = "Car",
    'FOURWHEELS' = "4-Wheels",
    'VAN' = "Van",
    'LORRY' = "Lorry"
}