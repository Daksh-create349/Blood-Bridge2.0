
"use client";

import {
  BellRing,
  BarChart,
  BrainCircuit,
  Bot,
  History,
  Home,
  LayoutGrid,
  Send,
  Users,
  MapPin,
  Cog,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import BloodDropIcon from "../icons/blood-drop-icon";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Resource Inventory", icon: LayoutGrid },
  { href: "/send-request", label: "Send Request", icon: Send },
  { href: "/view-alerts", label: "Active Requests", icon: BellRing },
  { href: "/request-history", label: "Request History", icon: History },
  { href: "/camps", label: "Donation Camps", icon: MapPin },
  { href: "/analytics", label: "Analytics", icon: BarChart },
  { href: "/donors", label: "Donors", icon: Users },
];

const aiTools = [
  { href: "/forecasting", label: "AI Supply Forecasting", icon: BrainCircuit },
];

function SidebarNav({ isOpen }: { isOpen: boolean }) {
    const pathname = usePathname();
    const isLinkActive = (href: string) => pathname === href;

    return (
        <nav className="flex-1 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-2">
          <p className={cn("px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase transition-opacity duration-300", !isOpen && "opacity-0")}>Main</p>
          <ul className="space-y-1">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} title={label}>
                  <Button
                    variant={isLinkActive(href) ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", !isOpen && "justify-center")}
                  >
                    <Icon className={cn("mr-2 h-4 w-4", !isOpen && "mr-0")} />
                    <span className={cn("transition-opacity duration-300", !isOpen && "opacity-0 hidden")}>{label}</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
          
          <Accordion type="single" collapsible defaultValue="ai-tools" className="w-full">
            <AccordionItem value="ai-tools" className="border-none">
              <AccordionTrigger className={cn("px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase hover:no-underline [&[data-state=open]>svg]:text-muted-foreground", !isOpen && "justify-center")}>
                 <span className={cn("transition-opacity duration-300", !isOpen && "opacity-0 hidden")}>AI Tools</span>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="space-y-1 mt-1">
                  {aiTools.map(({ href, label, icon: Icon }) => (
                    <li key={href}>
                      <Link href={href} title={label}>
                        <Button
                          variant={isLinkActive(href) ? "secondary" : "ghost"}
                          className={cn("w-full justify-start", !isOpen && "justify-center")}
                        >
                          <Icon className={cn("mr-2 h-4 w-4", !isOpen && "mr-0")} />
                          <span className={cn("transition-opacity duration-300", !isOpen && "opacity-0 hidden")}>{label}</span>
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
         <div className="space-y-1">
            <p className={cn("px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase transition-opacity duration-300", !isOpen && "opacity-0")}>App</p>
            <Link href="/settings" title="Settings">
                <Button
                    variant={isLinkActive('/settings') ? 'secondary' : 'ghost'}
                    className={cn("w-full justify-start", !isOpen && "justify-center")}
                >
                    <Cog className={cn("mr-2 h-4 w-4", !isOpen && "mr-0")} />
                    <span className={cn("transition-opacity duration-300", !isOpen && "opacity-0 hidden")}>Settings</span>
                </Button>
            </Link>
        </div>
      </nav>
    );
}

export default function AppSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside className={cn("fixed top-0 left-0 h-full flex-shrink-0 border-r border-border bg-card p-4 flex flex-col transition-all duration-300 z-30", isOpen ? "w-64" : "w-20")}>
      <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-6 focus:outline-none group">
        <div className="text-primary group-hover:scale-110 transition-transform">
          <BloodDropIcon className="h-8 w-8" />
        </div>
        <h2 className={cn("text-xl font-bold font-headline text-foreground group-hover:text-primary transition-opacity duration-300", !isOpen && "opacity-0 hidden")}>
          Blood Bridge
        </h2>
      </Link>
      <SidebarNav isOpen={isOpen} />
    </aside>
  );
}
