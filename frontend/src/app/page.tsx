/**
 * Reference from v0 by Vercel.
 * @see https://v0.dev/t/5mvAyBdNYiU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              {/* <CpuIcon className="h-6 w-6" /> */}
              <span className="">Courier VMS</span>
            </Link>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              {/* <BellIcon className="h-4 w-4" /> */}
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                {/* <HomeIcon className="h-4 w-4" /> */}
                Courier VMS
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                {/* <CpuIcon className="h-4 w-4" /> */}
                Vehicles
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                {/* <UsersIcon className="h-4 w-4" /> */}
                Maintenance
              </Link>
            </nav>
          </div>
        </div>
      </div>
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
            {/* <Card>
              <CardHeader>
                <CardTitle>Sensor Readings</CardTitle>
                <CardDescription>Total sensor readings collected</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <span className="text-4xl font-semibold">4.5M</span>
              </CardContent>
            </Card> */}
          </div>
        </main>
      </div>
    </div>
  )
}
