import Header from "@/components/header"
import Form from '@/components/ui/maintenance/update-form'
import { fetchMaintenanceRecordById, fetchVehicleById } from "@/lib/data"

interface EditMaintenanceRecordPageProps {
    params: {
        id: string
    }
}

export default async function EditMaintenanceRecordPage({ params }: EditMaintenanceRecordPageProps) {
    const record = await fetchMaintenanceRecordById(parseInt(params.id))

    if (record === undefined) {
        return (
            <div>404</div>
        )
    }

    const vehicle = await fetchVehicleById(record.vehicleId.toString())

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