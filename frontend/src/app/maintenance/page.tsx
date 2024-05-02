import Header from "@/components/header"
import { columns } from "@/components/ui/maintenance/data-table/columns"
import DataTable from "@/components/ui/maintenance/data-table/data-table"
import { getClient as getApolloClient } from "@/lib/graphql/server-side"
import { gql } from "@apollo/client"

const query = gql`
    query getMaintenaces {
        maintenances {
            id
            vehicle {
                plateNo
            }
            scheduledAt
            maintainedAt
            mileage
            remarks
        }
    }
`

export default async function MaintenanceRecords() {
    const { data: { maintenances } } = await getApolloClient().query({ query })

    return (
        <div>
            <Header title="Maintenance Records" />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={maintenances} />
                </div>
            </main>
        </div>
    )
}