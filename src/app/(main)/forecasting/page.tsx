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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  bloodType: z.string().min(1, "Blood type is required"),
  historicalData: z.string().min(10, "Please provide some historical data."),
  upcomingEvents: z.string().min(10, "Please describe upcoming events."),
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
          <p className="text-muted-foreground">Submit the form to get an AI-powered supply forecast.</p>
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodType: "",
      historicalData: "Date,Supply,Demand\n2024-01-01,100,80\n2024-02-01,120,90\n2024-03-01,90,100",
      upcomingEvents: "National holiday on 2024-07-04. Increased accidents expected. Major hospital scheduled surgeries on 2024-08-10.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setForecast(null);
    try {
      const result = await getSupplyForecast(values);
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
                <FormField
                  control={form.control}
                  name="historicalData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Historical Data</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Provide historical supply and demand data..." {...field} rows={6} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="upcomingEvents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upcoming Events</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe any upcoming holidays, events, or scheduled surgeries..." {...field} rows={4} />
                      </FormControl>
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
