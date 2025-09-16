
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
import { Droplets, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UpdateStockDialogProps {
  resource: BloodResource | null;
  onClose: () => void;
  onConfirm: (resourceId: string, newQuantity: number) => void;
}

export function UpdateStockDialog({ resource, onClose, onConfirm }: UpdateStockDialogProps) {
  const [quantity, setQuantity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (resource) {
      setQuantity(resource.quantity);
      // Reset login state when a new resource is selected or dialog is reopened
      setIsLoggedIn(false);
      setEmail("");
      setPassword("");
    }
  }, [resource]);

  if (!resource) {
    return null;
  }

  const handleLogin = () => {
    // Mock authentication - always succeeds
    setIsLoggedIn(true);
    toast({
      title: "Login Successful",
      description: `Welcome, admin for ${resource.location}.`,
    });
  };

  const handleConfirm = () => {
    if (quantity >= 0) {
      onConfirm(resource.id, quantity);
    }
  };

  const handleDialogClose = () => {
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <Dialog open={!!resource} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
      <DialogContent>
        {!isLoggedIn ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <LogIn className="h-6 w-6 text-primary" />
                Hospital Admin Login
              </DialogTitle>
              <DialogDescription>
                Please log in to update stock for <span className="font-bold text-primary">{resource.location}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hospital.admin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button onClick={handleLogin}>
                Login
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
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
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} disabled={quantity < 0}>
                Save Changes
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
