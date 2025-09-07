"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertRecommendation } from "@/ai/flows/analyze-urgent-request";
import { getUrgentRequestAnalysis } from "./actions";
import { PageHeader } from "@/components/pages/common/page-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { Bot, Lightbulb } from "lucide-react";

const formSchema = z.object({
  bloodType: z.string().min(1, "Blood type is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  urgency: z.string().min(1, "Urgency level is required"),
  hospitalLocation: z.string().min(1, "Location is required"),
  nearbyDonorCount: z.coerce.number().min(0, "Donor count cannot be negative"),
});

const RecommendationDisplay = ({ recommendation, isLoading }: { recommendation: AlertRecommendation | null, isLoading: boolean }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> AI Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (!recommendation) {
    return (
      <Card className="flex flex-col items-center justify-center h-full text-center">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> AI Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Submit the form to get an AI-powered alert strategy.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Bot /> AI Recommendation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Alert Strategy</h3>
          <p className="text-muted-foreground">Based on the provided data, here's the optimal strategy.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Timing</p>
                <p className="text-lg font-semibold">{recommendation.alertTiming}</p>
            </div>
            <div className="rounded-lg border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Scope</p>
                <p className="text-lg font-semibold">{recommendation.alertScope}</p>
            </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mt-4"><Lightbulb className="text-accent"/> Reasoning</h3>
          <p className="text-muted-foreground mt-2 text-sm bg-muted/50 p-4 rounded-md">{recommendation.reasoning}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function UrgentRequestPage() {
  const [recommendation, setRecommendation] = useState<AlertRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodType: "",
      quantity: 1,
      urgency: "",
      hospitalLocation: "",
      nearbyDonorCount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getUrgentRequestAnalysis(values);
      setRecommendation(result);
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
        title="Urgent Request AI"
        description="Get AI-powered recommendations for emergency blood requests."
      />
      <div className="flex-1 p-6 grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
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
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity (units)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select urgency" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hospitalLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Downtown, Metro City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nearbyDonorCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nearby Donor Count</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Analyzing...' : 'Get Recommendation'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <RecommendationDisplay recommendation={recommendation} isLoading={isLoading} />
      </div>
    </div>
  );
}
