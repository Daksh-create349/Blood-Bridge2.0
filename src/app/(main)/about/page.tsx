import { PageHeader } from "@/components/pages/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Users, BrainCircuit } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="About Blood Bridge"
        description="Our mission is to save lives by connecting blood donors with those in critical need."
      />
      <div className="flex-1 p-6 space-y-8">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 space-y-4">
              <h2 className="text-2xl font-bold font-headline">The Lifeline Connection</h2>
              <p className="text-muted-foreground">
                Blood Bridge was born from a simple yet powerful idea: to leverage technology to eliminate delays in emergency blood supply. Every second counts in a medical crisis, and our platform is designed to be the fastest, most efficient bridge between blood banks, hospitals, and volunteer donors.
              </p>
              <p className="text-muted-foreground">
                We use cutting-edge AI to analyze needs, forecast demand, and optimize the alert process, ensuring that help is mobilized instantly and effectively. Our goal is to create a resilient, community-driven ecosystem where no call for blood goes unanswered.
              </p>
            </div>
             <div className="relative h-64 md:h-full">
                <Image
                    src="https://picsum.photos/800/600"
                    alt="Team working"
                    fill
                    className="object-cover"
                    data-ai-hint="teamwork collaboration"
                />
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                <HeartPulse className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">Save Lives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our primary goal is to reduce response times and save lives during critical emergencies.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
               <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">Build Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We connect donors, hospitals, and blood banks to build a strong, responsive community network.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">Innovate with AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Using AI, we provide intelligent forecasting and request analysis to stay ahead of shortages.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
