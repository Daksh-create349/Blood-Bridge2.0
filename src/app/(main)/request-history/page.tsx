"use client";

import { useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { MOCK_REQUEST_HISTORY } from "@/lib/data";
import type { RequestHistoryItem, RequestStatus } from "@/lib/types";
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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const statusColors: Record<RequestStatus, "default" | "destructive" | "outline"> = {
  Fulfilled: "default",
  Expired: "destructive",
  Active: "outline",
};

export default function RequestHistoryPage() {
  const [history] = useLocalStorage<RequestHistoryItem[]>("requestHistory", MOCK_REQUEST_HISTORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");

  const filteredHistory = history.filter((item) => {
    const searchMatch = item.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === "all" || item.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Request History"
        description="Browse past urgent requests and their outcomes."
      />
      <div className="flex-1 p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={statusFilter}
            onValueChange={(value: RequestStatus | "all") => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Fulfilled">Fulfilled</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card className="border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fulfilled By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{new Date(item.timePosted).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{item.hospital}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.bloodType}</Badge>
                  </TableCell>
                  <TableCell>{item.quantity} units</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>{item.fulfilledBy || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
