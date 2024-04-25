import Header from "@/components/header";
import NavigationBar from "@/components/nav";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        status: "ONLINE",
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
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <NavigationBar />
            <div className="flex flex-col">
                <Header title="Vehicles" />
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
            </div>
        </div>
    )
}