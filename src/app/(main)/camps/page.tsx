
"use client";

import { MapPin, Calendar, Clock, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/pages/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLocalStorage from "@/hooks/use-local-storage";
import { MOCK_CAMPS } from "@/lib/data";
import type { BloodCamp } from "@/lib/types";

function CampCard({ camp }: { camp: BloodCamp }) {
  return (
    <Card className="hover:border-primary/50 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold font-headline">{camp.name}</CardTitle>
        <p className="text-sm text-muted-foreground pt-1 flex items-center gap-2">
            <HeartHandshake className="h-4 w-4" />
            Organized by {camp.organizer}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-accent" />
          <span className="text-foreground">{camp.location}</span>
        </div>
        <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-accent" />
            <span className="text-foreground">{new Date(camp.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-accent" />
            <span className="text-foreground">{camp.timings}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CampsPage() {
  const [camps] = useLocalStorage<BloodCamp[]>("camps", MOCK_CAMPS);

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Blood Donation Camps"
        description="Find upcoming blood donation camps in Navi Mumbai."
      />
      <div className="flex-1 p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
            <CampCard key={camp.id} camp={camp} />
          ))}
        </div>
      </div>
    </div>
  );
}
