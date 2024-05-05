'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Vehicle } from "@/lib/definitions";
import { CreateMaintenanceRecordFormSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createMaintenanceRecord from "@/lib/graphql/maintenance/create";


export default function CreateMaintenanceRecordForm({ vehicles }: { vehicles: Vehicle[] }) {
    const now = new Date()
    const form = useForm<z.infer<typeof CreateMaintenanceRecordFormSchema>>({
        resolver: zodResolver(CreateMaintenanceRecordFormSchema),
        defaultValues: {
            scheduledAt: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
        }
    })
    const router = useRouter()

    async function onSubmit(values: z.infer<typeof CreateMaintenanceRecordFormSchema>) {
        const [record, errors] = await createMaintenanceRecord(values)

        router.push("/maintenance")

        return toast({
            title: "Create maintenance record submitted:",
            description: `Maintenance record for vehicle ${record.vehicle.plateNo} has been created ${record.scheduledAt}. (ID: ${record.id})`
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
                                    <Select onValueChange={e => field.onChange(parseInt(e))}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {vehicles.map(vehicle => (
                                                <SelectItem key={vehicle.id} value={vehicle.id.toString()}>{vehicle.plateNo} ({vehicle.nickname})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Vehicle
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

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