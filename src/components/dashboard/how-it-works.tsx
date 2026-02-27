import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

const steps = [
    { text: "Open an account with our fully licensed and regulated platform." },
    { text: "Select the traders you want to copy based on their performance." },
    { text: "Our platform will automatically replicate their trades in your account." },
];

export default function HowItWorks() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <Image
                    src="https://picsum.photos/seed/zulutrade-how/600/400"
                    alt="How it works"
                    width={600}
                    height={400}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                    data-ai-hint="man chart interaction"
                />
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How it works?</h2>
                    <ul className="space-y-4">
                        {steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{step.text}</span>
                            </li>
                        ))}
                    </ul>
                    <Button>Get Started</Button>
                </div>
            </div>
        </section>
    );
}
