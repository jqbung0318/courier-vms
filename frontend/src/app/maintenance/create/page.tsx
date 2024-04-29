import Header from "@/components/header";
import { fetchVehicles } from "@/lib/data";
import Form from "@/components/ui/maintenance/create-form";

export default async function CreateMaintenanceRecordPage() {
    const vehicles = await fetchVehicles();

    return (
        <div>
            <Header title="Create New Maintenance Record" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Form vehicles={vehicles} />
            </main>
        </div>
    )
}