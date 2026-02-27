'use client';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckCircle, Copy, LayoutGrid, Briefcase, BarChart2, ArrowUp, ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { traders, instruments } from "@/lib/data";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import Link from "next/link";

export default function Home() {
  const whyEtradeItems = [
    { text: "Copy trading to your fingertips", icon: Copy },
    { text: "Multiple asset access", icon: LayoutGrid },
    { text: "Integrated brokers", icon: Briefcase },
    { text: "Advanced analytics", icon: BarChart2 },
  ];

  return (
    <div className="text-foreground">
      {/* Hero */}
      <section className="py-16 px-6 bg-card text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            The <span className="text-primary">Social Intelligence Platform</span>
            <br /> that helps you invest in a smart way
          </motion.h1>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Go long or short? Go Etrade! Connect with experienced traders and
            boost your trading journey.
          </p>
          <Button asChild size="lg" className="px-8 py-3 text-lg mb-10">
            <Link href="/signup">Join Now</Link>
          </Button>
          <div>
            <Image
                src="/Home banner image.png"
                alt="Home banner"
                width={1000}
                height={600}
                className="rounded-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[{ label: "Countries", value: "150+" }, { label: "Accounts", value: "30M+" }, { label: "Leaders", value: "2M+" }].map((item, i) => (
            <Card key={i} className="rounded-2xl shadow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{item.value}</div>
                <div className="text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="/2nd image.png"
            alt="Trust"
            width={600}
            height={500}
            className="rounded-2xl w-full object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Trust is… Trading is not easy</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <span>Staying focused takes time</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <span>Building and maintaining strategy is hard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <span>Many investors end up losing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Etrade */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Why Etrade?</h2>
          <p className="text-muted-foreground mt-2">Powerful tools to grow your portfolio</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {whyEtradeItems.map((item, i) => (
            <Card 
              key={i} 
              className="rounded-2xl shadow-lg relative group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-cover bg-center" 
              style={{ 
                  height: '200px', 
                  backgroundImage: "url('/cards.jpg')" 
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 group-hover:bg-white/30 transition-colors rounded-bl-full">
                  <item.icon className="w-7 h-7 text-white absolute top-6 right-6" />
              </div>
              <CardContent className="p-0 absolute bottom-6 left-6">
                  <p className="text-xl font-semibold text-white max-w-[150px]">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Leaders */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Etrade Top Leaders</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {traders.slice(0, 3).map((trader) => (
              <Card key={trader.id} className="rounded-2xl shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar className="h-12 w-12 border">
                        {trader.avatar && (
                            <AvatarImage src={trader.avatar.imageUrl} alt={trader.name} />
                        )}
                        <AvatarFallback>{trader.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{trader.name}</p>
                        <p className="text-sm text-green-600">+{trader.returns}% Growth</p>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trader.chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                          <YAxis domain={['dataMin', 'dataMax']} hide/>
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false}/>
                      </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Wide variety of instruments</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {instruments.map((instrument) => (
                <Card key={instrument.name} className="rounded-2xl shadow-md">
                    <CardContent className="p-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">{instrument.name}</span>
                            <span className={`flex items-center text-xs ${instrument.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {instrument.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                                {Math.abs(instrument.change).toFixed(2)}%
                            </span>
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
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Benefits</h2>
          <p className="text-muted-foreground mt-2">Everything you need for smarter trading</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "Transparent platform",
            "Advanced tools",
            "Innovative solutions",
            "Customer support",
            "Learning environment",
            "Unique features",
          ].map((item, i) => (
            <Card key={i} className="rounded-2xl shadow">
              <CardContent className="p-6 text-center">{item}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
