import { Award } from "lucide-react";
import { awards } from "@/lib/data";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export default function Awards() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Awards</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Recognized for excellence and innovation in the financial industry.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 py-12">
                    {awards.map((award, index) => (
                        <Card key={index} className="bg-transparent border-none shadow-none text-center">
                            <CardContent className="flex flex-col items-center gap-4 p-0">
                                <Award className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
                                <CardTitle className="text-sm font-semibold">{award.title}</CardTitle>
                                <CardDescription className="text-xs">{award.issuer}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
