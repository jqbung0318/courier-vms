"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { VehicleMaintenanceRecord } from "@/lib/definitions"

export const columns: ColumnDef<VehicleMaintenanceRecord>[] = [
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
        id: "plateNo",
        accessorKey: "vehicle.plateNo",
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
        accessorKey: "scheduledAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Scheduled Time
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "maintainedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Maintenance Time
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        filterFn: (row, columnId, filterValue) => {
            // if filter is not applied, print all
            if (!(filterValue === "true")) { return true }
            // else print those without maintainedAt
            return row.getValue(columnId) === null
        }
    },
    {
        accessorKey: "mileage",
        header: "Mileage",
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <Link
                key={'edit-row-' + row.original.id}
                href={'/maintenance/' + row.original.id}
            >
                <Pencil1Icon className="mr-2 h-4 w-4" />
                <span className="sr-only">Edit</span>
            </Link>
        )
    }
]