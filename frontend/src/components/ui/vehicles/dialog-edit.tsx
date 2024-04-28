import { Pencil1Icon } from "@radix-ui/react-icons"
import { Button } from "../button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"
import { Row } from "@tanstack/react-table"
import { UpdateVehicleFormSchema } from "@/lib/schema"

interface VehicleEditDialogProps<TData> {
    row: Row<TData>
}

export default function VehicleEditDialog<TData>({
    row,
}: VehicleEditDialogProps<TData>) {
    const task = UpdateVehicleFormSchema.parse(row.original)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="mx-0 px-0 data-[state=open]:bg-muted"
                >
                    <Pencil1Icon className="mr-2 h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Vehicle</DialogTitle>
                    <DialogDescription>
                        Editing vehicle
                    </DialogDescription>
                </DialogHeader>
                {/* TODO: add form to load and update data */}
                <div className="grid gap-4 py-4">
                    Are you sure to delete the selected items?
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="destructive">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" variant="default">Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}