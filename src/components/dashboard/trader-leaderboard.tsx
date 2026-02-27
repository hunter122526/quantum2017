'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { traders } from "@/lib/data"
import { Users, Copy } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts"

export default function TraderLeaderboard() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">ZuluTrade's Top Leaders</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Invest in people, not just markets. Copy top-performing traders from around the world.
            </p>
        </div>
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 py-12">
          {traders.map((trader) => (
            <Card key={trader.id} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-12 w-12 border">
                  {trader.avatar && (
                    <AvatarImage src={trader.avatar.imageUrl} alt={trader.name} data-ai-hint={trader.avatar.imageHint} />
                  )}
                  <AvatarFallback>{trader.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{trader.name}</CardTitle>
                  <CardDescription className="text-sm text-emerald-500 font-medium">
                    {`+${trader.returns}%`}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow h-24">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trader.chartData}>
                        <YAxis domain={['dataMin', 'dataMax']} hide/>
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2">
                <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{trader.followers.toLocaleString()} Followers</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Trader
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
