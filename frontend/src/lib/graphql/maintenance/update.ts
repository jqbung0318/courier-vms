"use server"

import { UpdateMaintenanceRecordFormSchema } from "@/lib/schema";
import { z } from "zod";
import { getClient } from "../server-side";
import { gql } from "@apollo/client";
import { revalidatePath } from "next/cache";

const updateMaintenanceRecordMutation = gql`
    mutation updateMaintenance (
        $id: Int!,
        $vehicleId: Int!,
        $scheduledAt: DateTime!,
        $maintainedAt: DateTime,
        $mileage: Int,
        $remarks: String,
    ) {
        updateMaintenance(
            updateMaintenanceInput: {
                id: $id
                vehicleId: $vehicleId
                scheduledAt: $scheduledAt
                maintainedAt: $maintainedAt
                mileage: $mileage
                remarks: $remarks
            }
        ) {
            id
            vehicle {
                id
                plateNo
            }
            scheduledAt
            maintainedAt
            mileage
            remarks
        }
    }
`

export default async function updateMaintenanceRecord(vehicleData: z.infer<typeof UpdateMaintenanceRecordFormSchema>) {
    try {
        const { data: { updateMaintenance }, errors } = await getClient().mutate({ mutation: updateMaintenanceRecordMutation, variables: { ...vehicleData } })

        revalidatePath('/maintenance')

        return [updateMaintenance, errors]
    } catch (err) {
        console.log(err);
        throw err
    }
}