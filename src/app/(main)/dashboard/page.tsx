"use client";

import { useState } from "react";
import type { BloodResource, BloodType, ResourceStatus } from "@/lib/types";
import { MOCK_RESOURCES } from "@/lib/data";
import useLocalStorage from "@/hooks/use-local-storage";
import { PageHeader } from "@/components/pages/common/page-header";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BloodDropIcon from "@/components/icons/blood-drop-icon";
import { Button } from "@/components/ui/button";
import { UpdateStockDialog } from "@/components/pages/dashboard/update-stock-dialog";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

const statusColors: Record<ResourceStatus, 'destructive' | 'secondary' | 'success'> = {
  Critical: 'destructive',
  Low: 'secondary',
  Available: 'success',
};

function ResourceCard({ resource, onUpdateClick, canUpdate }: { resource: BloodResource, onUpdateClick: (resource: BloodResource) => void, canUpdate: boolean }) {
  return (
    <Card className={!canUpdate ? 'opacity-60' : ''}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <BloodDropIcon className="h-5 w-5" />
          Blood Type: {resource.bloodType}
        </CardTitle>
        <Badge variant={statusColors[resource.status]}>{resource.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{resource.quantity} units</div>
        <p className="text-xs text-muted-foreground">{resource.location}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onUpdateClick(resource)} disabled={!canUpdate}>
          { !canUpdate && <Lock className="mr-2 h-3 w-3" /> }
          Update Units
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function DashboardPage() {
  const [resources, setResources] = useLocalStorage<BloodResource[]>("resources", MOCK_RESOURCES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ResourceStatus | "all">("all");
  const [selectedResource, setSelectedResource] = useState<BloodResource | null>(null);
  const { isAuthenticated, hospital: loggedInHospital } = useAuth();
  const router = useRouter();

  const filteredResources = resources.filter((resource) => {
    const searchMatch =
      resource.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === "all" || resource.status === statusFilter;
    return searchMatch && statusMatch;
  });

  const criticalCount = resources.filter(r => r.status === 'Critical').length;
  const lowCount = resources.filter(r => r.status === 'Low').length;
  
  const handleUpdateClick = (resource: BloodResource) => {
    if (isAuthenticated && loggedInHospital === resource.location) {
      setSelectedResource(resource);
    } else {
      const redirectUrl = encodeURIComponent('/dashboard');
      const hospitalName = encodeURIComponent(resource.location);
      router.push(`/login?redirect=${redirectUrl}&hospital=${hospitalName}`);
    }
  };
  
  const canUpdate = (hospitalName: string) => {
      return !isAuthenticated || loggedInHospital === hospitalName;
  }

  const handleCloseDialog = () => {
    setSelectedResource(null);
  };

  const handleUpdateStock = (resourceId: string, newQuantity: number) => {
    setResources(prev => {
      return prev.map(r => {
        if (r.id === resourceId) {
          let newStatus: ResourceStatus = 'Available';
          if (newQuantity <= 5) {
            newStatus = 'Critical';
          } else if (newQuantity <= 20) {
            newStatus = 'Low';
          }
          return { ...r, quantity: newQuantity, status: newStatus };
        }
        return r;
      });
    });
    handleCloseDialog();
  };

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Resource Inventory"
        description="Monitor and manage blood supply levels across locations."
      />
      <div className="flex-1 p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Supplies</CardTitle>
              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <span className="text-destructive font-bold">{criticalCount}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Items needing immediate attention.
              </p>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Supplies</CardTitle>
              <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                 <span className="text-yellow-400 font-bold">{lowCount}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Items that may need restocking soon.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <Input
            placeholder="Filter by blood type or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={statusFilter}
            onValueChange={(value: ResourceStatus | "all") => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              onUpdateClick={handleUpdateClick} 
              canUpdate={!isAuthenticated || loggedInHospital === resource.location}
            />
          ))}
        </div>
      </div>
      <UpdateStockDialog 
        resource={selectedResource}
        onClose={handleCloseDialog}
        onConfirm={handleUpdateStock}
      />
    </div>
  );
}
