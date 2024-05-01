import Header from "@/components/header";
import { columns } from "@/components/ui/vehicles/data-table/columns";
import DataTable from "@/components/ui/vehicles/data-table/data-table";
import { getClient as getApolloClient } from "@/lib/graphql/server-side";
import { gql } from "@apollo/client"

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

export default async function Vehicles() {
    const { data: { vehicles } } = await getApolloClient().query({ query })

    return (
        <div>
            <Header title="Vehicles" />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={vehicles} />
                </div>
            </main>
        </div>
    )
}
