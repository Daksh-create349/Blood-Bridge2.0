"use client";

import {
  BellRing,
  BarChart,
  BrainCircuit,
  Bot,
  History,
  Home,
  Info,
  LayoutGrid,
  Users,
  LogOut,
  LogIn,
  Building,
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
import { useAuth } from "@/context/auth-context";

const menuItems = [
  { href: "/dashboard", label: "Resource Inventory", icon: LayoutGrid },
  { href: "/view-alerts", label: "Active Requests", icon: BellRing },
  { href: "/request-history", label: "Request History", icon: History },
  { href: "/analytics", label: "Analytics", icon: BarChart },
  { href: "/donors", label: "Donors", icon: Users },
];

const aiTools = [
  { href: "/urgent-request", label: "Urgent Request AI", icon: Bot },
  { href: "/forecasting", label: "AI Supply Forecasting", icon: BrainCircuit },
];

const aboutLink = { href: "/about", label: "About Us", icon: Info };
const homeLink = { href: "/", label: "Welcome Page", icon: Home };

export default function AppSidebar() {
  const pathname = usePathname();
  const { isAuthenticated, logout, hospital } = useAuth();

  const isLinkActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-card p-4 flex flex-col">
      <div className="flex items-center gap-3 px-2 mb-6">
        <BloodDropIcon className="h-8 w-8 text-primary" />
        <h2 className="text-xl font-bold font-headline text-primary-foreground">
          Blood Bridge
        </h2>
      </div>

      <nav className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <p className="px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Main</p>
          <ul className="space-y-1">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href}>
                  <Button
                    variant={isLinkActive(href) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
          
          <Accordion type="single" collapsible defaultValue="ai-tools" className="w-full">
            <AccordionItem value="ai-tools" className="border-none">
              <AccordionTrigger className="px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase hover:no-underline [&[data-state=open]>svg]:text-muted-foreground">
                AI Tools
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="space-y-1 mt-1">
                  {aiTools.map(({ href, label, icon: Icon }) => (
                    <li key={href}>
                      <Link href={href}>
                        <Button
                          variant={isLinkActive(href) ? "secondary" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {label}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <ul className="space-y-1 border-t border-border pt-4">
           {isAuthenticated && hospital && (
            <li className="px-2 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="truncate">Logged in as: {hospital}</span>
            </li>
          )}
          {isAuthenticated ? (
             <li>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </li>
          ) : (
            <li>
              <Link href="/login">
                <Button
                  variant={isLinkActive("/login") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Admin Login
                </Button>
              </Link>
            </li>
          )}
          <li>
            <Link href={aboutLink.href}>
              <Button
                variant={isLinkActive(aboutLink.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <aboutLink.icon className="mr-2 h-4 w-4" />
                {aboutLink.label}
              </Button>
            </Link>
          </li>
          <li>
            <Link href={homeLink.href}>
              <Button variant="ghost" className="w-full justify-start">
                <homeLink.icon className="mr-2 h-4 w-4" />
                {homeLink.label}
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
