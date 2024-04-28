import Header from "@/components/header";
import { columns } from "../../components/ui/vehicles/columns";
import { DataTable } from "../../components/ui/vehicles/data-table";
import { fetchVehicles, resolveBrandModel } from "@/lib/data";



export default async function Vehicles() {
    const data = await fetchVehicles()
        .then(vehicles => resolveBrandModel(vehicles))

    return (
        <div>
            <Header title="Vehicles" />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={data} />
                </div>
            </main>
        </div>
    )
}