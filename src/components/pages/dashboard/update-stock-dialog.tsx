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
          <DialogTitle>Update Blood Units</DialogTitle>
          <DialogDescription>
            Update the available units for {resource.bloodType} at {resource.location}.
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
