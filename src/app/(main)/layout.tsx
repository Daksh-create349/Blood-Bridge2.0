
"use client";

import AppSidebar from '@/components/layout/app-sidebar';
import { DonationAssistantWidget } from '@/components/layout/donation-assistant-widget';
import { useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar isOpen={isSidebarOpen} />
      <main className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <AppHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        {children}
      </main>
      <DonationAssistantWidget />
    </div>
  );
}
