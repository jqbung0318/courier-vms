import Header from "@/components/header";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const vehicles = [
    {
        plateNo: "AMK8268",
        nickname: "Paid",
        brand: "Honda",
        model: "Jazz",
        vehicleType: "CAR",
        status: "ONLINE",
    },
    {
        plateNo: "BMK8268",
        nickname: "Pending",
        brand: "Hyundai",
        model: "Pruz",
        vehicleType: "CAR",
        status: "OFFLINE",
    },
    {
        plateNo: "CMK8268",
        nickname: "Unpaid",
        brand: "Honda",
        model: "Star",
        vehicleType: "MOTORCYCLE",
        status: "ONLINE",
    },
    {
        plateNo: "DMK8268",
        nickname: "Paid",
        brand: "Hyundai",
        model: "Ioniq",
        vehicleType: "FOURWHEELS",
        status: "ONLINE",
    },
    {
        plateNo: "EMK8268",
        nickname: "Paid",
        brand: "Honda",
        model: "BHR",
        vehicleType: "VAN",
        status: "MAINTENANCE",
    },
    {
        plateNo: "FMK8268",
        nickname: "Pending",
        brand: "Toyota",
        model: "Vios",
        vehicleType: "LORRY",
        status: "OFFLINE",
    },
    {
        plateNo: "GMK8268",
        nickname: "Unpaid",
        brand: "Toyota",
        model: "Camry",
        vehicleType: "CAR",
        status: "MAINTENANCE",
    },
]

export default function Vehicles() {
    return (
        <div>
            <Header title="Vehicles" />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">

                <Link
                    key='create-vehicle'
                    href='/vehicles/create'
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <PlusIcon className="w-6" />
                    Create Vehicle
                </Link>

                <Table>
                    <TableCaption>Courier Vehicle List</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Plate Number</TableHead>
                            <TableHead>Nickname</TableHead>
                            <TableHead>Vehicle Type</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle.plateNo}>
                                <TableCell className="font-medium">{vehicle.plateNo}</TableCell>
                                <TableCell>{vehicle.nickname}</TableCell>
                                <TableCell>{vehicle.vehicleType}</TableCell>
                                <TableCell>{vehicle.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </div>
    )
}