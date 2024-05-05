/**
 * Reference from v0 by Vercel.
 * @see https://v0.dev/t/5mvAyBdNYiU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Header from "@/components/header"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { gql } from "@apollo/client"
import { getClient as getApolloClient } from "@/lib/graphql/server-side"
import { Vehicle, VehicleMaintenanceRecord } from "@/lib/definitions"

const summaryQuery = gql`
  query getVehicleCount {
    summary {
      vehicleCount
      activeVehicleCount
      maintenanceVehicleCount
    }
  }
`

const offlineVehiclesQuery = gql`
  query getVehicles {
        vehicles(status: OFFLINE) {
            id
            plateNo
            nickname
            brand {
                name
            }
            model {
                name
            }
            type
            status
        }
    }
`

const incomingMaintenanceQuery = gql`
  query getIncomingMaintenance {
    maintenances(incoming: true) {
      id
      vehicle {
        plateNo
        nickname
        type
      }
      scheduledAt
    }
  }
`

export default async function Home() {
  const [
    { data: { summary } },
    { data: { vehicles } },
    { data: { maintenances } },
  ]: [
      { data: { summary: any } },
      { data: { vehicles: Vehicle[] } },
      { data: { maintenances: VehicleMaintenanceRecord[] } },
    ] = await Promise.all([
      getApolloClient().query({ query: summaryQuery, context: { fetchOptions: { next: { revalidate: 10 } } } }),
      getApolloClient().query({ query: offlineVehiclesQuery, context: { fetchOptions: { next: { revalidate: 10 } } } }),
      getApolloClient().query({ query: incomingMaintenanceQuery, context: { fetchOptions: { next: { revalidate: 10 } } } }),
    ])

  return (
    <div>
      <Header title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Vehicles</CardTitle>
              <CardDescription>Number of vehicles</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <span className="text-4xl font-semibold">{summary.vehicleCount}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Vehicles</CardTitle>
              <CardDescription>Vehicles currently in service</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <span className="text-4xl font-semibold">{summary.activeVehicleCount}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>In Maintenance Vehicles</CardTitle>
              <CardDescription>Vehicles currently in maintenance</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <span className="text-4xl font-semibold">{summary.maintenanceVehicleCount}</span>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Offlined Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Plate Number</TableHead>
                    <TableHead>Nickname</TableHead>
                    <TableHead>Vehicle Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    vehicles.map(vehicle => (
                      <TableRow key={vehicle.plateNo}>
                        <TableCell className="font-medium">{vehicle.plateNo}</TableCell>
                        <TableCell>{vehicle.nickname}</TableCell>
                        <TableCell>{vehicle.type}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Incoming Vehicle Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Plate Number</TableHead>
                    <TableHead>Nickname</TableHead>
                    <TableHead>Vehicle Type</TableHead>
                    <TableHead>Maitenance Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    maintenances.map(record => (
                      <TableRow key={record.vehicle?.plateNo}>
                        <TableCell className="font-medium">{record.vehicle?.plateNo}</TableCell>
                        <TableCell>{record.vehicle?.nickname}</TableCell>
                        <TableCell>{record.vehicle?.type}</TableCell>
                        <TableCell>{(new Date(record.scheduledAt)).toDateString()}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
