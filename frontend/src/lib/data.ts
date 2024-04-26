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