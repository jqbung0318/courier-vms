import { CircleIcon, DotIcon, SlashIcon } from "@radix-ui/react-icons";

export const vehicleStatuses = [
    {
        value: "ONLINE",
        label: "online",
        icon: DotIcon
    },
    {
        value: "OFFLINE",
        label: "offline",
        icon: CircleIcon
    },
    {
        value: "MAINTENANCE",
        label: "maintenance",
        icon: SlashIcon
    }
]

export const vehicleTypes = [
    {
        value: "MOTORCYCLE",
        label: "Motorcycle",
        icon: DotIcon
    },
    {
        value: "CAR",
        label: "Car",
        icon: DotIcon
    },
    {
        value: "FOURWHEELS",
        label: "4-Wheels",
        icon: DotIcon
    },
    {
        value: "VAN",
        label: "van",
        icon: DotIcon
    },
    {
        value: "LORRY",
        label: "Lorry",
        icon: DotIcon
    },
]

export async function fetchVehicleBrands() {
    try {
        return [
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
        ]
    } catch (err) {
        console.error('GraphQL Error', err);
        throw new Error('Failed to fetch all vehicle brands');
    }
}

export async function fetchVehicleModels() {
    try {
        return [
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
        ]
    } catch (err) {
        console.error('GraphQL Error', err);
        throw new Error('Failed to fetch all vehicle models');
    }
}