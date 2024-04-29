import Header from "@/components/header"
import NavigationBar from "@/components/nav"
import { columns } from "@/components/ui/maintenance/data-table/columns"
import DataTable from "@/components/ui/maintenance/data-table/data-table"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { fetchMaintenanceRecords, resolveVehicle } from "@/lib/data"


export default async function MaintenanceRecords() {
    const data = await fetchMaintenanceRecords()
        .then(records => resolveVehicle(records))

    return (
        <div>
            <Header title="Maintenance Records" />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">

                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={data} />
                </div>


                {/* <Table>
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
                </Table> */}
            </main>
        </div>
    )
}