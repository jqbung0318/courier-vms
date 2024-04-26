'use server';

import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const VehicleFormSchema = z.object({
    id: z.string(),
    plateNo: z.string(),
    nickname: z.string(),
    type: z.enum(['Motorcycle', 'Cars', '4-Wheels', 'Van', 'Lorry']),
    vehicleBrandId: z.string(),
    vehicleModelId: z.string(),
    status: z.enum(['online', 'offline', 'maintenance']),
    createdAt: z.string(),
    updatedAt: z.string(),
})

const CreateVehicleFormSchema = VehicleFormSchema.omit({ id: true, createdAt: true, updatedAt: true })
// const EditVehicleFormSchema = VehicleFormSchema.omit({ id: true, createdAt: true, updatedAt: true })


export function CreateVehicleForm() {
    const form = useForm<z.infer<typeof CreateVehicleFormSchema>>({
        resolver: zodResolver(CreateVehicleFormSchema),
        defaultValues: {
            type: 'Cars',
            status: 'online'
        }
    })

    function onSubmit(values: z.infer<typeof CreateVehicleFormSchema>) {
        console.log(values);

    }
}

// // This is temporary
// export type VehicleState = {
//     errors?: {
//         plateNo?: string[];
//         nickname?: string[];
//         type?: string[];
//         vehicleBrandId?: string[];
//         vehicleModelId?: string[];
//         status?: string[];
//     };
//     message?: string | null;
// };

// export async function createVehicle(prevState: VehicleState, formData: FormData) {
//     // Validate form fields using Zod
//     const validatedFields = CreateVehicleFormSchema.safeParse({
//         plateNo: formData.get('plateNo'),
//         nickname: formData.get('nickname'),
//         type: formData.get('vehicleType'),
//         vehicleBrandId: formData.get('brandId'),
//         vehicleModelId: formData.get('modelId'),
//         status: formData.get('status'),
//     });

//     // If form validation fails, return errors early. Otherwise, continue.
//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Missing Fields. Failed to Create Vehicle.',
//         };
//     }

//     // Prepare data for insertion into the database
//     const {
//         plateNo,
//         nickname,
//         type,
//         vehicleBrandId,
//         vehicleModelId,
//         status,
//     } = validatedFields.data;

//     // Insert data with GraphQL
//     // try {
//     //     await sql`
//     //   INSERT INTO invoices (customer_id, amount, status, date)
//     //   VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     // `;
//     // } catch (error) {
//     //     // If a database error occurs, return a more specific error.
//     //     return {
//     //         message: 'Database Error: Failed to Create Invoice.',
//     //     };
//     // }

//     // Revalidate the cache for the invoices page and redirect the user.
//     revalidatePath('/vehicles');
//     redirect('/vehicles');
// }
