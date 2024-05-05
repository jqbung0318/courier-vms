'use client';

import { Vehicle, VehicleBrandsField, VehicleModelsField, VehicleType } from "@/lib/definitions";
import { UpdateVehicleFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "../use-toast";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import updateVehicle from "@/lib/graphql/vehicles/update";


export function UpdateVehicleForm({ vehicle, brands, models }: { vehicle: Vehicle, brands: VehicleBrandsField[], models: VehicleModelsField[] }) {
    const form = useForm<z.infer<typeof UpdateVehicleFormSchema>>({
        resolver: zodResolver(UpdateVehicleFormSchema),
        defaultValues: { ...vehicle }
    })
    const router = useRouter()

    async function onSubmit(values: z.infer<typeof UpdateVehicleFormSchema>) {
        const [vehicle, errors] = await updateVehicle(values)

        router.push("/vehicles")

        return toast({
            title: "Update vehicle submitted:",
            description: `Vehicle with plate ${vehicle.plateNo} has been updated. (Vehicle ID: ${vehicle.id})`
        })
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="vehicleBrandId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <Select
                                        onValueChange={value => field.onChange(parseInt(value))}
                                        defaultValue={field.value.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle brand" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {brands.map(brand => (
                                                <SelectItem key={brand.name} value={brand.id.toString()}>{brand.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Vehicle brand
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="vehicleModelId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()} disabled={!form.getValues("vehicleBrandId")}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle model" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                !form.getValues("vehicleBrandId")
                                                    // return nothing if brand has not been selected
                                                    ? <></>
                                                    // filter the models by the brand id
                                                    : models.filter(m => m.vehicleBrandId === form.getValues("vehicleBrandId")).map(model => (
                                                        <SelectItem key={model.name} value={model.id.toString()}>{model.name}</SelectItem>

                                                    ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        {!form.getValues("vehicleBrandId") ? <>Please select vehicle brand first</> : <>Vehicle model</>}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="plateNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Plate</FormLabel>
                                    <FormControl>
                                        <Input placeholder='AGG 8268' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Vehicle number plate
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nickname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nickname</FormLabel>
                                    <FormControl>
                                        <Input placeholder='WMS-889-V' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Vehicle nickname
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem key='motorcycle' value='MOTORCYCLE'>Motorcycle</SelectItem>
                                            <SelectItem key='car' value='CAR'>Car</SelectItem>
                                            <SelectItem key='fourwheels' value='FOURWHEELS'>Fourwheels</SelectItem>
                                            <SelectItem key='van' value='VAN'>Van</SelectItem>
                                            <SelectItem key='lorry' value='LORRY'>Lorry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Vehicle type
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Vehicle Status</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={String(field.value)}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="ONLINE" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Online
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="OFFLINE" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Offline
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="MAINTENANCE" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Maintenance</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
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