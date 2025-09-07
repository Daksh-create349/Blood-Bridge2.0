"use client";

import useLocalStorage from "@/hooks/use-local-storage";
import { MOCK_RESOURCES } from "@/lib/data";
import type { BloodResource } from "@/lib/types";
import { PageHeader } from "@/components/pages/common/page-header";
import { InventoryByTypeChart } from "@/components/pages/analytics/inventory-by-type-chart";
import { InventoryByStatusChart } from "@/components/pages/analytics/inventory-by-status-chart";

export default function AnalyticsPage() {
  const [resources] = useLocalStorage<BloodResource[]>("resources", MOCK_RESOURCES);

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Analytics"
        description="Visualizing blood supply data and trends."
      />
      <div className="flex-1 p-6 grid md:grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <InventoryByTypeChart data={resources} />
        <InventoryByStatusChart data={resources} />
      </div>
    </div>
  );
}
