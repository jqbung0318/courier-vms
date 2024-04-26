'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VehicleBrandsField, VehicleModelsField } from '@/lib/definitions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '../use-toast';
import { RadioGroup, RadioGroupItem } from '../radio-group';


const VehicleFormSchema = z.object({
    id: z.string(),
    plateNo: z.string(),
    nickname: z.string(),
    type: z.enum(['Motorcycle', 'Car', '4-Wheels', 'Van', 'Lorry']),
    vehicleBrandId: z.string(),
    vehicleModelId: z.string(),
    status: z.enum(['online', 'offline', 'maintenance']),
    createdAt: z.string(),
    updatedAt: z.string(),
})

const CreateVehicleFormSchema = VehicleFormSchema.omit({ id: true, createdAt: true, updatedAt: true })

export function CreateVehicleForm({ brands, models }: { brands: VehicleBrandsField[], models: VehicleModelsField[] }) {
    const form = useForm<z.infer<typeof CreateVehicleFormSchema>>({
        resolver: zodResolver(CreateVehicleFormSchema),
        defaultValues: {
            type: 'Car',
            status: 'online'
        }
    })

    function onSubmit(values: z.infer<typeof CreateVehicleFormSchema>) {
        // console.log(values);
        toast({
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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


// export default function Form({ brands }: { brands: VehicleBrandsField[] }) {
//     const initialState = { message: "", errors: {} };
//     const [state, dispatch] = useFormState(createVehicle, initialState);

//     return (
//         <form action={dispatch}>
//             <div className="rounded-md bg-gray-50 p-4 md:p-6">
//                 {/* Customer Name */}
//                 <div className="mb-4">
//                     <label htmlFor="brand" className="mb-2 block text-sm font-medium">
//                         Choose vehicle brand
//                     </label>
//                     <div className="relative">
//                         <select
//                             id="brand"
//                             name="brandId"
//                             className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                             defaultValue=""
//                             aria-describedby="vehicle-brand-error"
//                         >
//                             <option value="" disabled>
//                                 Select a vehicle brand
//                             </option>
//                             {brands.map((brand) => (
//                                 <option key={brand.id} value={brand.id}>
//                                     {brand.name}
//                                 </option>
//                             ))}
//                         </select>
//                         <RocketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//                     </div>

//                     {/* <div id="vehicle-brand-error" aria-live="polite" aria-atomic="true">
//                         {state.errors?.vehicleBrandId &&
//                             state.errors.customerId.map((error: string) => (
//                                 <p className="mt-2 text-sm text-red-500" key={error}>
//                                     {error}
//                                 </p>
//                             ))}
//                     </div> */}
//                 </div>

//                 {/* Invoice Amount */}
//                 {/* <div className="mb-4">
//                     <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//                         Choose an amount
//                     </label>
//                     <div className="relative mt-2 rounded-md">
//                         <div className="relative">
//                             <input
//                                 id="amount"
//                                 name="amount"
//                                 type="number"
//                                 step="0.01"
//                                 placeholder="Enter USD amount"
//                                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                                 aria-describedby="amount-error"
//                             />
//                             <StarFilledIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//                         </div>
//                     </div>

//                     <div id="amount-error" aria-live="polite" aria-atomic="true">
//                         {state.errors?.amount &&
//                             state.errors.amount.map((error: string) => (
//                                 <p className="mt-2 text-sm text-red-500" key={error}>
//                                     {error}
//                                 </p>
//                             ))}
//                     </div>
//                 </div> */}

//                 {/* Vehicle Status */}
//                 <fieldset>
//                     <legend className="mb-2 block text-sm font-medium">
//                         Set the vehicle status
//                     </legend>
//                     <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//                         <div className="flex gap-4">
//                             <div className="flex items-center">
//                                 <input
//                                     id="online"
//                                     name="status"
//                                     type="radio"
//                                     value="online"
//                                     className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
//                                 />
//                                 <label
//                                     htmlFor="online"
//                                     className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
//                                 >
//                                     Online <ClockIcon className="h-4 w-4" />
//                                 </label>
//                             </div>
//                             <div className="flex items-center">
//                                 <input
//                                     id="offline"
//                                     name="status"
//                                     type="radio"
//                                     value="offline"
//                                     className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                                 />
//                                 <label
//                                     htmlFor="offline"
//                                     className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
//                                 >
//                                     Offline <CheckIcon className="h-4 w-4" />
//                                 </label>
//                             </div>
//                             <div className="flex items-center">
//                                 <input
//                                     id="maintenance"
//                                     name="status"
//                                     type="radio"
//                                     value="maintenance"
//                                     className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                                 />
//                                 <label
//                                     htmlFor="maintenance"
//                                     className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
//                                 >
//                                     Maintenance <CheckIcon className="h-4 w-4" />
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                     {/* <div id="status-error" aria-live="polite" aria-atomic="true">
//                         {state.errors?.status &&
//                             state.errors.status.map((error: string) => (
//                                 <p className="mt-2 text-sm text-red-500" key={error}>
//                                     {error}
//                                 </p>
//                             ))}
//                     </div> */}
//                 </fieldset>

//                 <div aria-live="polite" aria-atomic="true">
//                     {state.message ? (
//                         <p className="mt-2 text-sm text-red-500">{state.message}</p>
//                     ) : null}
//                 </div>
//             </div>
//             <div className="mt-6 flex justify-end gap-4">
//                 <Link
//                     href="/dashboard/invoices"
//                     className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//                 >
//                     Cancel
//                 </Link>
//                 <Button type="submit">Create Invoice</Button>
//             </div>
//         </form>
//     );
// }