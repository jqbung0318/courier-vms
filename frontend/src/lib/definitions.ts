export type Vehicle = {
    id: number;
    plateNo: string;
    nickname: string;
    type: 'Motorcycle' | 'Car' | '4-Wheels' | 'Van' | 'Lorry';
    vehicleBrandId: number;
    vehicleModelId: number;
    status: 'online' | 'offline' | 'maintenance';
}

export type VehicleBrandsField = {
    id: number;
    name: string;
}

export type VehicleModelsField = {
    id: number;
    name: string;
}