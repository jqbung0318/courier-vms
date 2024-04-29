"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Vehicle } from "@/lib/definitions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Vehicle = {
//     id: number
//     plateNo: string
//     nickname: string
//     brand: string
//     model: string
//     type: "MOTORCYCLE" | "CAR" | "FOURWHEELS" | "VAN" | "LORRY"
//     status: "ONLINE" | "OFFLINE" | "MAINTENANCE"
// }

export const columns: ColumnDef<Vehicle>[] = [
    {
        id: "select",
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
        accessorKey: "type",
        header: "Vehicle Type",
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <Link
                key={'edit-row-' + row.original.id}
                href={'/vehicles/' + row.original.id}
            >
                <Pencil1Icon className="mr-2 h-4 w-4" />
                <span className="sr-only">Edit</span>
            </Link>
        )
    }
]
