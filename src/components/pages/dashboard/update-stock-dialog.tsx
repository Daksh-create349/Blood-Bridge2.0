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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BloodResource } from "@/lib/types";
import { Droplets } from "lucide-react";

interface UpdateStockDialogProps {
  resource: BloodResource | null;
  onClose: () => void;
  onConfirm: (resourceId: string, newQuantity: number) => void;
}

export function UpdateStockDialog({ resource, onClose, onConfirm }: UpdateStockDialogProps) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (resource) {
      setQuantity(resource.quantity);
    }
  }, [resource]);

  if (!resource) {
    return null;
  }

  const handleConfirm = () => {
    if (quantity >= 0) {
      onConfirm(resource.id, quantity);
    }
  };

  return (
    <Dialog open={!!resource} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            Update Blood Units
          </DialogTitle>
          <DialogDescription>
            Update the available units for blood type <span className="font-bold text-primary">{resource.bloodType}</span> at {resource.location}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter new quantity"
            className="text-lg"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={quantity < 0}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
