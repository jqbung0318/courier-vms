import { CreateVehicleForm as Form } from '@/components/ui/vehicles/create-form';
import Header from "@/components/header";
import { gql } from "@apollo/client";
import { getClient as getApolloClient } from "@/lib/graphql/server-side";

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

export default async function CreateVehiclePage() {
    const [
        { data: { brands } },
        { data: { models } }
    ] = await Promise.all([
        getApolloClient().query({ query: brandsQuery, context: { fetchOptions: { next: { revalidate: 60 } } } }),
        getApolloClient().query({ query: modelsQuery, context: { fetchOptions: { next: { revalidate: 60 } } } }),
    ])

    return (
        <div>
            <Header title="Create New Vehicle" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Form brands={brands} models={models} />
            </main>
        </div>
    )
}