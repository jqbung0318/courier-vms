import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "../button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"

export default function DeleteConfirmDialog() {
    return (
        <Dialog>
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
                    <Button type="submit" variant="destructive">Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}