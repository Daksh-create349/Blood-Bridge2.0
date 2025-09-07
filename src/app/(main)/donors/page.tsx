"use client";

import { useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { MOCK_DONORS } from "@/lib/data";
import type { BloodType, Donor } from "@/lib/types";
import { PageHeader } from "@/components/pages/common/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function DonorsPage() {
  const [donors] = useLocalStorage<Donor[]>("donors", MOCK_DONORS);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState<BloodType | "all">("all");

  const filteredDonors = donors.filter((donor) => {
    const searchMatch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const bloodTypeMatch = bloodTypeFilter === "all" || donor.bloodType === bloodTypeFilter;
    return searchMatch && bloodTypeMatch;
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Donors"
        description="Manage and view registered donor information."
      />
      <div className="flex-1 p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={bloodTypeFilter}
            onValueChange={(value: BloodType | "all") => setBloodTypeFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Blood Types</SelectItem>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => (
                <SelectItem key={bt} value={bt}>{bt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Card className="border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Donation</TableHead>
                <TableHead className="text-right">Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium">{donor.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{donor.bloodType}</Badge>
                  </TableCell>
                  <TableCell>{donor.location}</TableCell>
                  <TableCell>{new Date(donor.lastDonation).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Call</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
