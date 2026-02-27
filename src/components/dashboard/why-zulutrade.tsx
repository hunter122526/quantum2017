import Image from "next/image";
import { CheckCircle } from "lucide-react";

const reasons = [
    { title: "Vast Network of Traders", description: "Gain access to thousands of signal providers from over 192 countries." },
    { title: "Advanced Risk Management", description: "Features like ZuluGuard™ protect your account from volatile market swings." },
    { title: "Fully Transparent", description: "All trader performance is calculated by us, ensuring you get unbiased results." },
    { title: "Multi-Broker Platform", description: "Connect your existing account from over 50 supported brokers worldwide." },
    { title: "Mobile Apps", description: "Trade on the go with our native iOS and Android applications." },
];

export default function WhyZuluTrade() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why ZuluTrade?</h2>
                    <ul className="space-y-4">
                        {reasons.map((reason, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <div className="font-bold text-primary text-xl">{index + 1}.</div>
                                <div>
                                    <h3 className="font-semibold">{reason.title}</h3>
                                    <p className="text-muted-foreground">{reason.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Image
                    src="https://picsum.photos/seed/zulutrade-why/600/400"
                    alt="Why ZuluTrade"
                    width={600}
                    height={400}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                    data-ai-hint="robot stocks chart"
                />
            </div>
        </section>
    );
}
