"use client";

import { useState } from "react";
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
import type { UrgentRequest, BloodBank } from "@/lib/types";
import { MOCK_BLOOD_BANKS } from "@/lib/data";

interface DonationDialogProps {
  request: UrgentRequest | null;
  onClose: () => void;
  onConfirm: (requestId: string, bloodBank: BloodBank) => void;
}

export function DonationDialog({ request, onClose, onConfirm }: DonationDialogProps) {
  const [selectedBankId, setSelectedBankId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  if (!request) {
    return null;
  }

  const handleConfirm = () => {
    const selectedBank = MOCK_BLOOD_BANKS.find(b => b.id === selectedBankId);
    if (selectedBank) {
      setIsLoading(true);
      // Simulate network delay
      setTimeout(() => {
        onConfirm(request.id, selectedBank);
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
            You are offering to donate {request.quantity} units of {request.bloodType} blood for the request from {request.hospital}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <label htmlFor="blood-bank" className="text-sm font-medium">Select your nearest blood bank</label>
          <Select value={selectedBankId} onValueChange={setSelectedBankId}>
            <SelectTrigger id="blood-bank" className="mt-2">
              <SelectValue placeholder="Choose a blood bank..." />
            </SelectTrigger>
            <SelectContent>
              {MOCK_BLOOD_BANKS.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  {bank.name} - {bank.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedBankId || isLoading}>
            {isLoading ? "Confirming..." : "I Can Donate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
