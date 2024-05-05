'use client';

import { Vehicle, VehicleMaintenanceRecord } from "@/lib/definitions";
import { toast } from "../use-toast";
import { z } from "zod";
import { UpdateMaintenanceRecordFormSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { clean, cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import updateMaintenanceRecord from "@/lib/graphql/maintenance/update";


export default function UpdateMaintenanceRecord({ record, vehicle }: { record: VehicleMaintenanceRecord, vehicle: Vehicle }) {
    const form = useForm<z.infer<typeof UpdateMaintenanceRecordFormSchema>>({
        resolver: zodResolver(UpdateMaintenanceRecordFormSchema),
        defaultValues: {
            ...clean(record),
        }
    })

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof UpdateMaintenanceRecordFormSchema>) {
        const [record, errors] = await updateMaintenanceRecord(values)

        router.push("/maintenance")

        return toast({
            title: "Update maintenance record submitted:",
            description: `Maintenance record for vehicle ${record.vehicle.plateNo} has been updated ${record.scheduledAt}. (ID: ${record.id})`

        })
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="vehicleId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle</FormLabel>
                                    <Select disabled defaultValue={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem key={vehicle.id} value={vehicle.id.toString()}>{vehicle.plateNo} ({vehicle.nickname})</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Vehicle
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <div className="flex"></div>

                        <FormField
                            control={form.control}
                            name="scheduledAt"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Scheduled Maintenance Time</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Vehicle next scheduled time for maintenance
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="maintainedAt"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Actual Maintenance Time</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Vehicle actual maintenance time
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="mileage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mileage</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder='1000' {...field} onChange={event => field.onChange(+event.target.value)} />
                                    </FormControl>
                                    <FormDescription>
                                        Vehicle mileage during service
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="remarks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Remarks</FormLabel>
                                    <FormControl>
                                        <Input placeholder='custom message here' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Additional maintenance message
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </main>
    )
}