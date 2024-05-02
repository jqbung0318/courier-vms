import Header from "@/components/header"
import Form from '@/components/ui/maintenance/update-form'
import { fetchMaintenanceRecordById, fetchVehicleById } from "@/lib/data"
import { VehicleMaintenanceRecord } from "@/lib/definitions"
import { getClient as getApolloClient } from "@/lib/graphql/server-side"
import { gql } from "@apollo/client"

interface EditMaintenanceRecordPageProps {
    params: {
        id: string
    }
}

const recordQuery = gql`
    query getMaintenanceRecord($id: Int!) {
        maintenance (id: $id) {
            id
            vehicleId
            vehicle {
                id
                plateNo
                nickname
            }
            scheduledAt
            maintainedAt
            mileage
            remarks
        }
    }
`


export default async function EditMaintenanceRecordPage({ params }: EditMaintenanceRecordPageProps) {
    const { data: { maintenance } }: { data: { maintenance: VehicleMaintenanceRecord } } = await getApolloClient().query({ query: recordQuery, variables: { id: parseInt(params.id) } })

    // const record = await fetchMaintenanceRecordById(parseInt(params.id))

    if (maintenance === undefined) {
        return (
            <div>404</div>
        )
    }

    const { vehicle, ...record } = maintenance
    // const vehicle = await fetchVehicleById(record.vehicleId.toString())

    if (vehicle === undefined) {
        return (
            <div>404</div>
        )
    }

    return (
        <div>
            <Header title="Update Record" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Form record={record} vehicle={vehicle} />
            </main>
        </div>
    )
}