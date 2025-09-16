"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UrgentRequest, BloodResource } from "@/lib/types";
import { MOCK_RESOURCES } from "@/lib/data";
import useLocalStorage from "@/hooks/use-local-storage";

interface DonationDialogProps {
  request: UrgentRequest | null;
  onClose: () => void;
  onConfirm: (requestId: string, hospitalName: string) => void;
}

export function DonationDialog({ request, onClose, onConfirm }: DonationDialogProps) {
  const [selectedHospital, setSelectedHospital] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [resources] = useLocalStorage<BloodResource[]>("resources", MOCK_RESOURCES);

  const availableHospitals = [...new Set(resources.map(r => r.location))];

  useEffect(() => {
    if (!request) {
      setSelectedHospital("");
    }
  }, [request]);

  if (!request) {
    return null;
  }

  const handleConfirm = () => {
    if (selectedHospital) {
      setIsLoading(true);
      // Simulate network delay
      setTimeout(() => {
        onConfirm(request.id, selectedHospital);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <Dialog open={!!request} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Donation</DialogTitle>
          <DialogDescription>
            You are offering to donate {request.quantity} units of {request.bloodType} blood for the request from {request.hospital}. Please select the hospital or blood bank you will donate at.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <label htmlFor="hospital-select" className="text-sm font-medium">Select Hospital/Blood Bank</label>
          <Select value={selectedHospital} onValueChange={setSelectedHospital}>
            <SelectTrigger id="hospital-select" className="mt-2">
              <SelectValue placeholder="Choose a location..." />
            </SelectTrigger>
            <SelectContent>
              {availableHospitals.map((hospital) => (
                <SelectItem key={hospital} value={hospital}>
                  {hospital}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedHospital || isLoading}>
            {isLoading ? "Confirming..." : "I Can Donate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
