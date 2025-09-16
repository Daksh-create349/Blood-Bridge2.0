
"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/pages/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLocalStorage from "@/hooks/use-local-storage";
import { MOCK_CAMPS } from "@/lib/data";
import type { BloodCamp } from "@/lib/types";
import { RegistrationDialog } from "@/components/pages/camps/registration-dialog";
import { Button } from "@/components/ui/button";

function CampCard({ camp, onRegisterClick }: { camp: BloodCamp, onRegisterClick: (camp: BloodCamp) => void }) {
  return (
    <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors duration-300">
      <div>
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
      </div>
       <div className="p-6 pt-0">
          <Button className="w-full" onClick={() => onRegisterClick(camp)}>
            Register to Participate
          </Button>
      </div>
    </Card>
  );
}

export default function CampsPage() {
  const [camps] = useLocalStorage<BloodCamp[]>("camps", MOCK_CAMPS);
  const [selectedCamp, setSelectedCamp] = useState<BloodCamp | null>(null);

  const handleRegisterClick = (camp: BloodCamp) => {
    setSelectedCamp(camp);
  };

  const handleCloseDialog = () => {
    setSelectedCamp(null);
  };

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Blood Donation Camps"
        description="Find upcoming blood donation camps in Navi Mumbai."
      />
      <div className="flex-1 p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
            <CampCard key={camp.id} camp={camp} onRegisterClick={handleRegisterClick} />
          ))}
        </div>
      </div>
      <RegistrationDialog 
        camp={selectedCamp}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
