"use server"

import { CreateVehicleFormSchema } from "@/lib/schema";
import { z } from "zod";
import { getClient } from "../server-side";
import { gql } from "@apollo/client";
import { revalidatePath } from "next/cache";

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
            createVehicleInput: {
                plateNo: $plateNo,
                nickname: $nickname,
                type: $type,
                vehicleBrandId: $vehicleBrandId,
                vehicleModelId: $vehicleModelId,
                status: $status,
            }
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

export default async function createVehicle(vehicleData: z.infer<typeof CreateVehicleFormSchema>) {
    try {
        const { data: { vehicle }, errors } = await getClient().mutate({ mutation: createVehicleMutation, variables: { ...vehicleData } })

        revalidatePath('/vehicles')

        return [vehicle, errors]
    } catch (err) {
        console.log(err);
        throw err
    }
}