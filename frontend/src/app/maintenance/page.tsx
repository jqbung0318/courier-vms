import Header from "@/components/header"
import NavigationBar from "@/components/nav"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

const maintenanceRecords = [
    {
        plateNo: "AMK8268",
        scheduledAt: "26/4/2024",
        maintainedAt: "26/4/2024",
        mileage: 150000
    },
    {
        plateNo: "AMK8268",
        scheduledAt: "26/4/2024",
        maintainedAt: "26/4/2024",
        mileage: 150000
    },
]

export default function MaintenanceRecords() {
    return (
        <div>
            <Header title="Vehicles" />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <Table>
                    <TableCaption>Courier Vehicle List</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Plate Number</TableHead>
                            <TableHead>Scheduled Maintenance Time</TableHead>
                            <TableHead>Maintenance Done</TableHead>
                            <TableHead>Mileage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {maintenanceRecords.map((record) => (
                            <TableRow key={record.plateNo}>
                                <TableCell className="font-medium">{record.plateNo}</TableCell>
                                <TableCell>{record.scheduledAt}</TableCell>
                                <TableCell>{record.maintainedAt}</TableCell>
                                <TableCell>{record.mileage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </div>
    )
}