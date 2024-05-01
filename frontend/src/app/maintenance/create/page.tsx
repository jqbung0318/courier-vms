import Header from "@/components/header";
import Form from "@/components/ui/maintenance/create-form";
import { gql } from "@apollo/client";
import { getClient as getApolloClient } from "@/lib/graphql/server-side";

const query = gql`
    query getVehicles {
        vehicles {
            id
            plateNo
            nickname
            brand {
                name
            }
            model {
                name
            }
            type
            status
        }
    }
`

export default async function CreateMaintenanceRecordPage() {
    const { data: { vehicles } } = await getApolloClient().query({ query })

    return (
        <div>
            <Header title="Create New Maintenance Record" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Form vehicles={vehicles} />
            </main>
        </div>
    )
}