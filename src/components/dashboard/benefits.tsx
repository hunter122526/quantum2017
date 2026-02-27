import { benefits } from "@/lib/data";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export default function Benefits() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Benefit From</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            A rich set of features to enhance your trading experience.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-12">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="bg-transparent border-none shadow-none">
                            <CardContent className="flex flex-col items-center text-center gap-4 p-0">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <benefit.icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle>{benefit.title}</CardTitle>
                                <CardDescription>{benefit.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
