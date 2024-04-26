import { fetchVehicleBrands, fetchVehicleModels } from "@/lib/data";
import { CreateVehicleForm as Form } from '@/components/ui/vehicles/create-form';
import Header from "@/components/header";

export default async function CreateVehiclePage() {
    const [brands, models] = await Promise.all([
        fetchVehicleBrands(),
        fetchVehicleModels(),
    ])

    // const brands = await fetchVehicleBrands();

    return (
        <div>
            <Header title="Create New Vehicle" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Form brands={brands} models={models} />
            </main>
        </div>
    )
}