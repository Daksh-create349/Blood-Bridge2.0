"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { PageHeader } from "@/components/pages/common/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DonationDialog } from "@/components/pages/view-alerts/donation-dialog";
import useLocalStorage from "@/hooks/use-local-storage";
import { MOCK_ACTIVE_REQUESTS, MOCK_REQUEST_HISTORY } from "@/lib/data";
import type { RequestHistoryItem, UrgentRequest } from "@/lib/types";
import BloodDropIcon from "@/components/icons/blood-drop-icon";
import { useToast } from "@/hooks/use-toast";

const urgencyColors: Record<UrgentRequest["urgency"], "destructive" | "secondary" | "outline"> = {
  Critical: "destructive",
  High: "secondary",
  Moderate: "outline",
};

function AlertCard({ request, onDonateClick }: { request: UrgentRequest, onDonateClick: (request: UrgentRequest) => void }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            <BloodDropIcon className="h-6 w-6 text-primary" />
            <span>Need: {request.quantity} units of {request.bloodType}</span>
          </CardTitle>
          <Badge variant={urgencyColors[request.urgency]}>{request.urgency}</Badge>
        </div>
        <CardDescription>{request.hospital} - {request.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Posted {formatDistanceToNow(new Date(request.timePosted), { addSuffix: true })}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onDonateClick(request)}>
          I Can Donate
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ViewAlertsPage() {
  const { toast } = useToast();
  const [activeRequests, setActiveRequests] = useLocalStorage<UrgentRequest[]>("activeRequests", MOCK_ACTIVE_REQUESTS);
  const [history, setHistory] = useLocalStorage<RequestHistoryItem[]>("requestHistory", MOCK_REQUEST_HISTORY);
  const [selectedRequest, setSelectedRequest] = useState<UrgentRequest | null>(null);

  const handleDonateClick = (request: UrgentRequest) => {
    setSelectedRequest(request);
  };

  const handleCloseDialog = () => {
    setSelectedRequest(null);
  };

  const handleConfirmDonation = (requestId: string, hospitalName: string) => {
    const requestToMove = activeRequests.find(req => req.id === requestId);
    if (requestToMove) {
      // Remove from active requests
      setActiveRequests(prev => prev.filter(req => req.id !== requestId));

      // Add to history
      const historyItem: RequestHistoryItem = {
        ...requestToMove,
        status: "Fulfilled",
        fulfilledBy: hospitalName,
        date: new Date().toISOString().split('T')[0],
      };
      setHistory(prev => [historyItem, ...prev]);

      toast({
        title: "Thank You!",
        description: `Your donation offer for ${requestToMove.bloodType} blood has been recorded.`,
      });
    }
    handleCloseDialog();
  };

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Active Requests"
        description="Find urgent requests for blood donations in your area."
      />
      <div className="flex-1 p-6">
        {activeRequests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeRequests.map(request => (
              <AlertCard key={request.id} request={request} onDonateClick={handleDonateClick} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full rounded-lg border-2 border-dashed border-border py-12">
            <h3 className="text-xl font-semibold">All Clear!</h3>
            <p className="text-muted-foreground mt-2">There are no active urgent requests at the moment.</p>
          </div>
        )}
      </div>
      <DonationDialog
        request={selectedRequest}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDonation}
      />
    </div>
  );
}
