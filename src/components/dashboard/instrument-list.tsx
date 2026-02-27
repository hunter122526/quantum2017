import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { instruments } from "@/lib/data"
import { ArrowUp, ArrowDown } from "lucide-react"

export default function InstrumentList() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Wide variety of Instruments</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Trade CFDs on Forex, Stocks, Indices, Commodities and Cryptocurrencies.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12">
          {instruments.map((instrument) => (
            <Card key={instrument.name}>
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{instrument.name}</span>
                  <span className="text-xs text-muted-foreground">{instrument.category}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col items-center rounded-md p-2 bg-green-100 dark:bg-green-900/50">
                    <span className="text-xs text-green-600 dark:text-green-400">BUY</span>
                    <span className="font-mono text-lg font-semibold text-green-700 dark:text-green-300">{instrument.buyPrice.toFixed(4)}</span>
                  </div>
                  <div className="flex flex-col items-center rounded-md p-2 bg-red-100 dark:bg-red-900/50">
                    <span className="text-xs text-red-600 dark:text-red-400">SELL</span>
                    <span className="font-mono text-lg font-semibold text-red-700 dark:text-red-300">{instrument.sellPrice.toFixed(4)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    {instrument.change > 0 ? (
                        <span className="flex items-center text-green-600">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            {instrument.change.toFixed(2)}%
                        </span>
                    ) : (
                        <span className="flex items-center text-red-600">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            {Math.abs(instrument.change).toFixed(2)}%
                        </span>
                    )}
                    <span>Spread: {instrument.spread}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
