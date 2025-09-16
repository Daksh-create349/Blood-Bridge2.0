
"use client";

import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function AppHeader({ toggleSidebar, isSidebarOpen }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/50 backdrop-blur-sm px-6 sticky top-0 z-20">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    </header>
  );
}
