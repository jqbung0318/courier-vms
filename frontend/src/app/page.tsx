/**
 * Reference from v0 by Vercel.
 * @see https://v0.dev/t/5mvAyBdNYiU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Header from "@/components/header"
import NavigationBar from "@/components/nav"

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
