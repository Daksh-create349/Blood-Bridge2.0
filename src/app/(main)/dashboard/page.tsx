"use client";

import { useState } from "react";
import type { BloodResource, ResourceStatus } from "@/lib/types";
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
import { Button } from "@/components/ui/button";
import { UpdateStockDialog } from "@/components/pages/dashboard/update-stock-dialog";
import { AlertTriangle, Droplets, PackageCheck, Pencil } from "lucide-react";

const statusConfig: Record<ResourceStatus, {
  variant: 'destructive' | 'warning' | 'success';
  icon: React.ElementType;
}> = {
  Critical: { variant: 'destructive', icon: AlertTriangle },
  Low: { variant: 'warning', icon: AlertTriangle },
  Available: { variant: 'success', icon: PackageCheck },
};

function ResourceCard({ resource, onUpdateClick }: { resource: BloodResource, onUpdateClick: (resource: BloodResource) => void }) {
  const config = statusConfig[resource.status];

  return (
    <Card className="hover:border-primary/50 transition-colors duration-300">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold font-headline flex items-center gap-2">
              <Droplets className="h-6 w-6 text-primary" />
              {resource.bloodType}
            </CardTitle>
            <Badge variant={config.variant} className="flex items-center gap-1.5">
              <config.icon className="h-3.5 w-3.5" />
              {resource.status}
            </Badge>
        </div>
        <p className="text-sm text-muted-foreground pt-1">{resource.location}</p>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{resource.quantity} <span className="text-base font-normal text-muted-foreground">units</span></div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onUpdateClick(resource)}>
          <Pencil className="mr-2 h-4 w-4" />
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
    setSelectedResource(resource);
  };
  
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
              <AlertTriangle className="h-5 w-5 text-destructive"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{criticalCount}</div>
              <p className="text-xs text-muted-foreground">
                Items needing immediate attention.
              </p>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Supplies</CardTitle>
              <AlertTriangle className="h-5 w-5 text-yellow-400"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowCount}</div>
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
