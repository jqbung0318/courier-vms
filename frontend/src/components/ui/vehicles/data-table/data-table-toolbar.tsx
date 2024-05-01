import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../select";
import { vehicleStatuses, vehicleTypes } from "@/lib/data";
import DeleteConfirmDialog from "./dialog-delete";

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}


export default function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const rowSelected = Object.keys(table.getState().rowSelection).length > 0

    return (
        <div className="flex items-center py-4">
            <div className="flex flex-1 items-center">
                <Input
                    placeholder="Filter nickname..."
                    value={(table.getColumn("nickname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("nickname")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm mr-2"
                />

                <div className="h-8 mx-2">
                    <Select
                        onValueChange={event => table.getColumn("status")?.setFilterValue(event)}
                        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {vehicleStatuses.map(option => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}>
                                        <span>{option.label}</span>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-8 mx-2">
                    <Select
                        onValueChange={event => table.getColumn("type")?.setFilterValue(event)}
                        value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Vehicle Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {vehicleTypes.map(option => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}>
                                        <span>{option.label}</span>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {
                    isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <Cross2Icon className="ml-2 h-4 w-4" />
                        </Button>
                    )
                }

            </div>

            <div className="lg:flex">
                {
                    rowSelected && (
                        <DeleteConfirmDialog selectedRow={table.getSelectedRowModel()} />
                    )
                }

                <Link
                    key='create-vehicle'
                    href='/vehicles/create'
                    className="flex h-8 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create Vehicle
                </Link>
            </div>
        </div>
    )
}