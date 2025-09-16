"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SupplyForecast } from "@/ai/flows/forecast-blood-supply";
import { getSupplyForecast } from "./actions";
import { PageHeader } from "@/components/pages/common/page-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, BrainCircuit, LineChart, ShieldAlert } from "lucide-react";
import useLocalStorage from "@/hooks/use-local-storage";
import { MOCK_RESOURCES, MOCK_REQUEST_HISTORY, MOCK_CAMPS } from "@/lib/data";
import type { BloodResource, RequestHistoryItem, BloodCamp } from "@/lib/types";


const formSchema = z.object({
  bloodType: z.string().min(1, "Blood type is required"),
});

const ForecastDisplay = ({ forecast, isLoading }: { forecast: SupplyForecast | null, isLoading: boolean }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> AI Forecast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!forecast) {
    return (
      <Card className="flex flex-col items-center justify-center h-full text-center">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> AI Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select a blood type and click "Generate Forecast" to get an AI-powered supply forecast.</p>
        </CardContent>
      </Card>
    );
  }

  const riskColor = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-destructive',
  }[forecast.shortageRisk.toLowerCase()] || 'text-foreground';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Bot /> AI Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2"><LineChart className="text-accent" /> Predicted Demand</h3>
          <p className="text-muted-foreground mt-2 text-sm bg-muted/50 p-4 rounded-md">{forecast.predictedDemand}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2"><ShieldAlert className="text-accent" /> Shortage Risk</h3>
          <p className={`mt-2 text-2xl font-bold capitalize ${riskColor}`}>{forecast.shortageRisk}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2"><BrainCircuit className="text-accent"/> Recommendations</h3>
          <p className="text-muted-foreground mt-2 text-sm bg-muted/50 p-4 rounded-md whitespace-pre-line">{forecast.recommendations}</p>
        </div>
      </CardContent>
    </Card>
  );
};


export default function ForecastingPage() {
  const [forecast, setForecast] = useState<SupplyForecast | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [resources] = useLocalStorage<BloodResource[]>("resources", MOCK_RESOURCES);
  const [requestHistory] = useLocalStorage<RequestHistoryItem[]>("requestHistory", MOCK_REQUEST_HISTORY);
  const [camps] = useLocalStorage<BloodCamp[]>("camps", MOCK_CAMPS);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodType: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setForecast(null);

    // Auto-generate data strings
    const historicalData = `
      Current Inventory for ${values.bloodType}:
      ${resources
        .filter(r => r.bloodType === values.bloodType)
        .map(r => `${r.quantity} units at ${r.location}`)
        .join('\n')
      }

      Recent Fulfilled Requests for ${values.bloodType}:
      ${requestHistory
        .filter(h => h.bloodType === values.bloodType && h.status === 'Fulfilled')
        .map(h => `${h.quantity} units requested by ${h.hospital} on ${h.date}`)
        .join('\n')
      }
    `;

    const upcomingEvents = `
      Upcoming Blood Donation Camps:
      ${camps
        .map(c => `${c.name} on ${c.date} at ${c.location}`)
        .join('\n')
      }
    `;

    try {
      const result = await getSupplyForecast({
          ...values,
          historicalData,
          upcomingEvents
      });
      setForecast(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="AI Supply Forecasting"
        description="Predict future blood supply needs and identify potential shortages."
      />
      <div className="flex-1 p-6 grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Forecasting Inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => (
                            <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Forecasting...' : 'Generate Forecast'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <ForecastDisplay forecast={forecast} isLoading={isLoading} />
      </div>
    </div>
  );
}
