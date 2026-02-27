import Image from "next/image";
import { CheckCircle } from "lucide-react";

const points = [
    "It requires in-depth market knowledge.",
    "It is emotionally and psychologically demanding.",
    "The learning curve is steep and often costly."
];

export default function TradingIsHard() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <Image
                    src="https://picsum.photos/seed/zulutrade-hard/600/400"
                    alt="Trading is hard"
                    width={600}
                    height={400}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                    data-ai-hint="man at computer"
                />
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-lg font-semibold">Truth is...</p>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Trading is not easy</h2>
                    </div>
                    <ul className="space-y-4">
                        {points.map((point, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="text-muted-foreground">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
