"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Checkbox } from "../checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Vehicle = {
    id: number
    plateNo: string
    nickname: string
    brand: string
    model: string
    vehicleType: "MOTORCYCLE" | "CAR" | "FOURWHEELS" | "VAN" | "LORRY"
    status: "ONLINE" | "OFFLINE" | "MAINTENANCE"
}

export const columns: ColumnDef<Vehicle>[] = [
    {
        id: "selecct",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "plateNo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Plate Number
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "nickname",
        header: "Nickname",
    },
    {
        accessorKey: "vehicleType",
        header: "Vehicle Type",
    },
    {
        accessorKey: "status",
        header: "Status"
    },
]
