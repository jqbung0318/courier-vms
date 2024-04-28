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
    'MOTORCYCLE' = <any>"Motorcycle",
    'CAR' = <any>"Car",
    'FOURWHEELS' = <any>"Four Wheels",
    'VAN' = <any>"Van",
    'LORRY' = <any>"Lorry"
}