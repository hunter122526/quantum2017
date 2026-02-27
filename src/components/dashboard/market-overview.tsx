'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "150+", label: "Traders" },
  { value: "30M+", label: "Assets" },
  { value: "2M+", label: "Strategies" },
];

export default function MarketOverview() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                The Social Intelligence Platform that helps you invest in a smart way
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Go long or short? Be Zulu! As a leading social trading platform, we give you access to a wide network of expert traders to copy-trade.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg">Join Now</Button>
            </div>
          </div>
           <div className="relative">
            <Image
              src="https://picsum.photos/seed/zulutrade-hero/800/600"
              alt="Hero"
              width={800}
              height={600}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              data-ai-hint="social network people"
            />
          </div>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
