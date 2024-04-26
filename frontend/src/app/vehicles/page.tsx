import Header from "@/components/header";
import { Vehicle, columns } from "../../components/ui/vehicles/columns";
import { DataTable } from "../../components/ui/vehicles/data-table";

async function getData(): Promise<Vehicle[]> {
    // TODO: API
    return [
        {
            id: 1,
            plateNo: "AMK8268",
            nickname: "AMK8268 - Wangsa Maju",
            brand: "Honda",
            model: "Jazz",
            vehicleType: "CAR",
            status: "ONLINE",
        },
        {
            id: 2,
            plateNo: "BMK8268",
            nickname: "BMK8268 - Dengkil",
            brand: "Hyundai",
            model: "Pruz",
            vehicleType: "CAR",
            status: "OFFLINE",
        },
        {
            id: 3,
            plateNo: "CMK8268",
            nickname: "CMK8268 - - Wangsa Maju",
            brand: "Honda",
            model: "Star",
            vehicleType: "MOTORCYCLE",
            status: "ONLINE",
        },
        {
            id: 4,
            plateNo: "DMK8268",
            nickname: "DMK8268 - Kepong",
            brand: "Hyundai",
            model: "Ioniq",
            vehicleType: "FOURWHEELS",
            status: "ONLINE",
        },
        {
            id: 5,
            plateNo: "EMK8268",
            nickname: "EMK8268 - Dengkil",
            brand: "Honda",
            model: "BHR",
            vehicleType: "VAN",
            status: "MAINTENANCE",
        },
        {
            id: 6,
            plateNo: "FMK8268",
            nickname: "FMK8268 - Kepong",
            brand: "Toyota",
            model: "Vios",
            vehicleType: "LORRY",
            status: "OFFLINE",
        },
        {
            id: 7,
            plateNo: "GMK8268",
            nickname: "GMK8268 - Wangsa Maju",
            brand: "Toyota",
            model: "Camry",
            vehicleType: "CAR",
            status: "MAINTENANCE",
        },
    ]
}

export default async function Vehicles() {
    const data = await getData()

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