import { Prisma, PrismaClient, VehicleStatus, VehicleType } from "@prisma/client";
import brandTemplate from "./templates/brands";
import modelTemplate from "./templates/models";
import vehicleTemplate from "./templates/vehicles";
import maintenanceRecordTemplate from "./templates/maintenance";

const prisma = new PrismaClient();

const main = async () => {
    const vehicleBrands = await prisma.vehicleBrand.createMany({
        data: brandTemplate
    })

    const vehicleModels = await prisma.vehicleModel.createMany({
        data: modelTemplate
    })

    // const vehicleBrands = await Promise.all(
    //     brandTemplate.map(b =>
    //         prisma.vehicleBrand.create({
    //             data: { ...b }
    //         })
    //     )
    // )

    // const vehicleModels = await Promise.all(
    //     modelTemplate.map(m =>
    //         prisma.vehicleModel.create({
    //             data: { ...m }
    //         })
    //     )
    // )

    const vehicles = await prisma.vehicle.createMany({
        data: vehicleTemplate
    })

    const maintenanceRecords = await prisma.vehicleMaintenaceRecord.createMany({
        data: maintenanceRecordTemplate
    })
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    });