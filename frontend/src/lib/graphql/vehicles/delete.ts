"use server"

import { revalidatePath } from "next/cache";
import { getClient } from "../server-side";
import { gql } from "@apollo/client";

const deleteVehicleMutation = gql`
    mutation deleteVehicle (
        $id: Int!,
    ) {
        removeVehicle(
            id: $id,
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

export default async function deleteVehicle(id: number) {
    try {
        const { data: { vehicle }, errors } = await getClient().mutate({ mutation: deleteVehicleMutation, variables: { id } })

        revalidatePath('/vehicles')

        return [vehicle, errors]
    } catch (err) {
        console.log(err);
        throw err
    }
}