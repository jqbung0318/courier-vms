/**
 * Reference from v0 by Vercel.
 * @see https://v0.dev/t/5mvAyBdNYiU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Header from "@/components/header"
import NavigationBar from "@/components/nav"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function Home() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <NavigationBar />
      <div className="flex flex-col">
        <Header title="Dashboard" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Vehicles</CardTitle>
                <CardDescription>Number of vehicles</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <span className="text-4xl font-semibold">1,234</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Vehicles</CardTitle>
                <CardDescription>Vehicles currently in service</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <span className="text-4xl font-semibold">987</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>In Maintenance Vehicles</CardTitle>
                <CardDescription>Vehicles currently in maintenance</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <span className="text-4xl font-semibold">10</span>
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
                    <TableRow key='BMK8268'>
                      <TableCell className="font-medium">BMK8268</TableCell>
                      <TableCell>Meh</TableCell>
                      <TableCell>LORRY</TableCell>
                    </TableRow>
                    <TableRow key='DMK8268'>
                      <TableCell className="font-medium">DMK8268</TableCell>
                      <TableCell>Meh</TableCell>
                      <TableCell>LORRY</TableCell>
                    </TableRow>
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
                    <TableRow key='BMK8268'>
                      <TableCell className="font-medium">BMK8268</TableCell>
                      <TableCell>Meh</TableCell>
                      <TableCell>LORRY</TableCell>
                      <TableCell>26/4/2024</TableCell>
                    </TableRow>
                    <TableRow key='DMK8268'>
                      <TableCell className="font-medium">DMK8268</TableCell>
                      <TableCell>Meh</TableCell>
                      <TableCell>LORRY</TableCell>
                      <TableCell>26/4/2024</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
