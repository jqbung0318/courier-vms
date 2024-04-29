import { CircleIcon, DotIcon, SlashIcon } from "@radix-ui/react-icons";
import { Vehicle, VehicleMaintenanceRecord } from "./definitions";
import { maintenanceRecords, vehicleBrands, vehicleModels, vehicles } from "./seed";

// used in data table column for filters
export const vehicleStatuses = [
    {
        value: "online",
        label: "online",
        icon: DotIcon
    },
    {
        value: "offline",
        label: "offline",
        icon: CircleIcon
    },
    {
        value: "maintenance",
        label: "maintenance",
        icon: SlashIcon
    }
]

// used in data table column for filters
export const vehicleTypes = [
    {
        value: "Motorcycle",
        label: "Motorcycle",
        icon: DotIcon
    },
    {
        value: "Car",
        label: "Car",
        icon: DotIcon
    },
    {
        value: "Four Wheels",
        label: "Four Wheels",
        icon: DotIcon
    },
    {
        value: "Van",
        label: "Van",
        icon: DotIcon
    },
    {
        value: "Lorry",
        label: "Lorry",
        icon: DotIcon
    },
]

export async function fetchVehicleById(id: string) {
    try {
        return vehicles.find(v => v.id.toString() === id)
    } catch (err) {
        console.error('GraphQL Error', err);
        throw new Error('Failed to fetch all vehicle brands');
    }
}

export async function fetchVehicles(): Promise<Vehicle[]> {
    // TODO: API
    return vehicles
}

export async function resolveBrandModel(vehicles: Vehicle[]): Promise<Vehicle[]> {
    return vehicles.map(v => {
        v.brand = vehicleBrands.find(brand => brand.id === v.vehicleBrandId)?.name
        v.model = vehicleModels.find(model => model.id === v.vehicleModelId)?.name

        return v
    })
}

export async function fetchVehicleBrands() {
    try {
        return vehicleBrands
    } catch (err) {
        console.error('GraphQL Error', err);
        throw new Error('Failed to fetch all vehicle brands');
    }
}

export async function fetchVehicleModels() {
    try {
        return vehicleModels
    } catch (err) {
        console.error('GraphQL Error', err);
        throw new Error('Failed to fetch all vehicle models');
    }
}

export async function fetchMaintenanceRecordById(id: number): Promise<VehicleMaintenanceRecord | undefined> {
    try {
        return maintenanceRecords.find(r => r.id === id)
    } catch (err) {
        console.error('GraphQL Error', err);
        throw new Error('Failed to fetch all vehicle brands');
    }
}

export async function fetchMaintenanceRecords() {
    try {
        return maintenanceRecords
    } catch (err) {
        console.error('GraphQL Error', err);
        throw new Error('Failed to fetch all vehicle models');
    }
}

export async function resolveVehicle(records: VehicleMaintenanceRecord[]): Promise<VehicleMaintenanceRecord[]> {
    return records.map(record => {
        record.plateNo = vehicles.find(v => v.id === record.vehicleId)?.plateNo

        return record
    })
}