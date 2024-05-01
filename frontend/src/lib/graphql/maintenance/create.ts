"use server"

import { CreateMaintenanceRecordFormSchema } from "@/lib/schema";
import { z } from "zod";
import { getClient } from "../server-side";
import { gql } from "@apollo/client";

const createMaintenaceRecordMutation = gql`
    mutation createMaintenanceRecord (
        $vehicleId: Int!,
        $scheduledAt: DateTime!,
        $maintainedAt: DateTime,
        $mileage: Int,
        $remarks: String,
    ) {
        createMaintenance(
            createMaintenanceInput: {
                vehicleId: $vehicleId
                scheduledAt: $scheduledAt
                maintainedAt: $maintainedAt
                mileage: $mileage
                remarks: $remarks
            }
        ) {
            id
            vehicle {
                plateNo
            }
            scheduledAt
            maintainedAt
            mileage
            remarks
        }
    }
`

export default async function createMaintenanceRecord(recordData: z.infer<typeof CreateMaintenanceRecordFormSchema>) {
    try {
        const { data: { createMaintenance }, errors } = await getClient().mutate({ mutation: createMaintenaceRecordMutation, variables: { ...recordData } })

        return [createMaintenance, errors]
    } catch (err) {
        console.log(err);
        throw err
    }
}