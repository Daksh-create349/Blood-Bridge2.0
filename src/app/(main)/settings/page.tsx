
"use client";

import { PageHeader } from "@/components/pages/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/components/providers/theme-provider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Settings"
        description="Manage your application preferences."
      />
      <div className="flex-1 p-6">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="w-16 h-8 rounded-lg bg-gray-200" />
                        <div className="w-10 h-4 rounded-lg bg-gray-400" />
                    </div>
                    <div className="w-full h-2 rounded-lg bg-gray-300" />
                     <div className="w-full h-2 rounded-lg bg-gray-300" />
                  </div>
                  <span className="mt-4 font-semibold">Light</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                   <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="w-16 h-8 rounded-lg bg-gray-700" />
                        <div className="w-10 h-4 rounded-lg bg-gray-500" />
                    </div>
                    <div className="w-full h-2 rounded-lg bg-gray-600" />
                     <div className="w-full h-2 rounded-lg bg-gray-600" />
                  </div>
                  <span className="mt-4 font-semibold">Dark</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <div className="w-16 h-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
                        <div className="w-10 h-4 rounded-lg bg-gray-400 dark:bg-gray-500" />
                    </div>
                    <div className="w-full h-2 rounded-lg bg-gray-300 dark:bg-gray-600" />
                     <div className="w-full h-2 rounded-lg bg-gray-300 dark:bg-gray-600" />
                  </div>
                  <span className="mt-4 font-semibold">System</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
