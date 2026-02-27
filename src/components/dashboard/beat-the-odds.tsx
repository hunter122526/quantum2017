import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BeatTheOdds() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-4 text-center lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Beat the odds with Copy Trading</h2>
                    <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        With our patented Copy-Trading technology, you can replicate the strategies of top-performing traders automatically.
                    </p>
                    <Button>Start Now</Button>
                </div>
                <Image
                    src="https://picsum.photos/seed/zulutrade-odds/600/400"
                    alt="Beat the odds"
                    width={600}
                    height={400}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                    data-ai-hint="man relaxing chair"
                />
            </div>
        </section>
    );
}
