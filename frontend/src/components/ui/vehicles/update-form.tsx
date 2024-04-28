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

export function UpdateVehicleForm({ vehicle, brands, models }: { vehicle: Vehicle, brands: VehicleBrandsField[], models: VehicleModelsField[] }) {
    const form = useForm<z.infer<typeof UpdateVehicleFormSchema>>({
        resolver: zodResolver(UpdateVehicleFormSchema),
        defaultValues: {
            plateNo: vehicle.plateNo,
            nickname: vehicle.nickname,
            vehicleBrandId: vehicle.vehicleBrandId,
            vehicleModelId: vehicle.vehicleModelId,
            status: vehicle.status,
            type: vehicle.type,
        }
    })
    const router = useRouter()
    const body = UpdateVehicleFormSchema.parse(vehicle)

    function onSubmit(values: z.infer<typeof UpdateVehicleFormSchema>) {
        router.push("/vehicles")

        return toast({
            title: "Update vehicle submitted:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            )
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
                                        onValueChange={field.onChange}
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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle model" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {models.map(model => (
                                                <SelectItem key={model.name} value={model.id.toString()}>{model.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Vehicle model
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem key='motorcycle' value='Motorcycle'>Motorcycle</SelectItem>
                                            <SelectItem key='car' value='Car'>Car</SelectItem>
                                            <SelectItem key='fourwheels' value='4-Wheels'>Fourwheels</SelectItem>
                                            <SelectItem key='van' value='Van'>Van</SelectItem>
                                            <SelectItem key='lorry' value='Lorry'>Lorry</SelectItem>
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
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="online" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Online
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="offline" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Offline
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="maintenance" />
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