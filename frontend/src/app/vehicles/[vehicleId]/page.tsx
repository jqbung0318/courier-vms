import { fetchVehicleBrands, fetchVehicleById, fetchVehicleModels } from "@/lib/data";
import { UpdateVehicleForm as Form } from '@/components/ui/vehicles/update-form';
import Header from "@/components/header";
import { gql } from "@apollo/client";
import { getClient as getApolloClient } from "@/lib/graphql/server-side";
import { VehicleStatus, VehicleType } from "@/lib/definitions";

interface EditVehiclePageProps {
    params: {
        vehicleId: string
    }
}

const brandsQuery = gql`
    query getBrands {
        brands {
            id
            name
        }
    }
`

const modelsQuery = gql`
    query getModels {
        models {
            id
            name
            vehicleBrandId
        }
    }
`

const vehicleQuery = gql`
    query getVehicle($id: Int!) {
        vehicle(id: $id) {
            id
            plateNo
            nickname
            vehicleBrandId
            vehicleModelId
            type
            status
        }
    }
`

export default async function EditVehiclePage({ params }: EditVehiclePageProps) {
    // const [vehicle, brands, models] = await Promise.all([
    //     fetchVehicleById(params.vehicleId),
    //     fetchVehicleBrands(),
    //     fetchVehicleModels(),
    // ])

    const [
        { data: { brands } },
        { data: { models } },
        { data: { vehicle } },
    ] = await Promise.all([
        getApolloClient().query({ query: brandsQuery, context: { fetchOptions: { next: { revalidate: 60 } } } }),
        getApolloClient().query({ query: modelsQuery, context: { fetchOptions: { next: { revalidate: 60 } } } }),
        getApolloClient().query({ query: vehicleQuery, variables: { id: parseInt(params.vehicleId) } }),
    ])

    // const brands = await fetchVehicleBrands();

    if (vehicle === undefined) {
        return (
            <div>404</div>
        )
    }
    const vehicleData = {
        ...vehicle,
        status: VehicleStatus[vehicle.status],
        type: VehicleType[vehicle.type]
    }


    return (
        <div>
            <Header title="Create New Vehicle" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Form vehicle={vehicle} brands={brands} models={models} />
            </main>
        </div>
    )
}