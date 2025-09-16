import AppSidebar from '@/components/layout/app-sidebar';
import { DonationAssistantWidget } from '@/components/layout/donation-assistant-widget';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </main>
      <DonationAssistantWidget />
    </div>
  );
}
