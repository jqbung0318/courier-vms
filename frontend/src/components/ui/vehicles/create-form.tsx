'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VehicleBrandsField, VehicleModelsField, VehicleStatus, VehicleType } from '@/lib/definitions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '../use-toast';
import { RadioGroup, RadioGroupItem } from '../radio-group';
import { useRouter } from 'next/navigation';
import { CreateVehicleFormSchema } from '@/lib/schema';
import { gql, useMutation } from '@apollo/client';
import { createApolloClient } from '@/lib/graphql/client';
import createVehicle from '@/lib/graphql/vehicles/create';

const createVehicleMutation = gql`
    mutation createVehicle (
        $plateNo: String!,
        $nickname: String!,
        $type: VehicleType!,
        $vehicleBrandId: Int!,
        $vehicleModelId: Int!,
        $status: VehicleStatus!,
    ) {
        createVehicle(
            plateNo: $plateNo,
            nickname: $nickname,
            type: $type,
            vehicleBrandId: $vehicleBrandId,
            vehicleModelId: $vehicleModelId,
            status: $status,
        ) {
            id
            plateNo
            nickname
            type
            vehicleBrandId
            vehicleModelId
            status
        }
    }
`

export function CreateVehicleForm({ brands, models }: { brands: VehicleBrandsField[], models: VehicleModelsField[] }) {
    const form = useForm<z.infer<typeof CreateVehicleFormSchema>>({
        resolver: zodResolver(CreateVehicleFormSchema),
        defaultValues: {
            type: VehicleType.CAR,
            status: VehicleStatus.ONLINE,
        }
    })
    const router = useRouter()

    async function onSubmit(values: z.infer<typeof CreateVehicleFormSchema>) {
        // const { data: { createVehicle }, errors } = await createApolloClient().mutate({ mutation: createVehicleMutation })
        const [vehicle, errors] = await createVehicle(values)

        router.push("/vehicles")

        return toast({
            title: "Create vehicle submitted:",
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
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="vehicleBrandId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(parseInt(value))}>
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

                                    <Select onValueChange={(value) => field.onChange(parseInt(value))} disabled={!form.getValues("vehicleBrandId")}>
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

                                                // !brandId
                                                //     // return nothing if brand has not been selected
                                                //     ? <></>
                                                //     // filter the models by the brand id
                                                //     : models.filter(m => m.vehicleBrandId === brandId).map(model => (
                                                //         <SelectItem key={model.name} value={model.id.toString()}>{model.name}</SelectItem>

                                                //     ))
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
