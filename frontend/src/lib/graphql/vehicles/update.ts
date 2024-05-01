"use server"

import { UpdateVehicleFormSchema } from "@/lib/schema";
import { z } from "zod";
import { getClient } from "../server-side";
import { gql } from "@apollo/client";

const updateVehicleMutation = gql`
    mutation updateVehicle (
        $id: Int!,
        $plateNo: String!,
        $nickname: String!,
        $type: VehicleType!,
        $vehicleBrandId: Int!,
        $vehicleModelId: Int!,
        $status: VehicleStatus!,
    ) {
        updateVehicle(
            updateVehicleInput: {
                id: $id,
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

export default async function updateVehicle(vehicleData: z.infer<typeof UpdateVehicleFormSchema>) {
    try {
        const { data: { vehicle }, errors } = await getClient().mutate({ mutation: updateVehicleMutation, variables: { ...vehicleData } })

        return [vehicle, errors]
    } catch (err) {
        console.log(err);
        throw err
    }
}