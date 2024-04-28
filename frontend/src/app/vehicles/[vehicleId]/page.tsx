import { fetchVehicleBrands, fetchVehicleById, fetchVehicleModels } from "@/lib/data";
import { UpdateVehicleForm as Form } from '@/components/ui/vehicles/update-form';
import Header from "@/components/header";

interface EditVehiclePageProps {
    params: {
        vehicleId: string
    }
}

export default async function EditVehiclePage({ params }: EditVehiclePageProps) {
    const [vehicle, brands, models] = await Promise.all([
        fetchVehicleById(params.vehicleId),
        fetchVehicleBrands(),
        fetchVehicleModels(),
    ])

    // const brands = await fetchVehicleBrands();

    if (vehicle === undefined) {
        return (
            <div>404</div>
        )
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