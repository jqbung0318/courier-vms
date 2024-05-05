import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import deleteVehicle from "@/lib/graphql/vehicles/delete"
import { toast } from "../../use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteConfirmDialog(props) {
    const router = useRouter()
    const vehicleIds = props.selectedRow.rows.map(item => item.original.id)
    const [dialogOpened, setDialogOpen] = useState(false)

    const handleOnclick = async () => {
        await Promise.all(
            vehicleIds.map(id => deleteVehicle(id))
        )

        router.refresh()
        setDialogOpen(false)

        return toast({
            title: "Vehicle deleted."
        })
    }

    return (
        <Dialog open={dialogOpened} onOpenChange={setDialogOpen} >
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="h-8 mx-2 px-2 lg:px-3"
                >
                    <Cross2Icon className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    Are you sure to delete the selected items?
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">No</Button>
                    </DialogClose>
                    <Button onClick={handleOnclick} type="submit" variant="destructive">Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}