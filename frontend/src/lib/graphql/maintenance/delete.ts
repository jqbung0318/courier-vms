"use server"

import { revalidatePath } from "next/cache";
import { getClient } from "../server-side";
import { gql } from "@apollo/client";

const deleteMaintenanceRecordMutation = gql`
    mutation deleteMaintenance (
        $id: Int!,
    ) {
        removeMaintenance(
            id: $id,
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

export default async function deleteMaintenanceRecord(id: number) {
    try {
        const { data: { removeMaintenance }, errors } = await getClient().mutate({ mutation: deleteMaintenanceRecordMutation, variables: { id } })

        revalidatePath('/maintenance')

        return [removeMaintenance, errors]
    } catch (err) {
        console.log(err);
        throw err
    }
}