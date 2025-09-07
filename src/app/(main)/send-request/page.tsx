
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useLocalStorage from "@/hooks/use-local-storage";
import type { UrgentRequest } from "@/lib/types";
import { MOCK_ACTIVE_REQUESTS } from "@/lib/data";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  bloodType: z.string().min(1, "Blood type is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  urgency: z.string().min(1, "Urgency level is required"),
  hospital: z.string().min(1, "Hospital name is required"),
  location: z.string().min(1, "Location is required"),
  radius: z.coerce.number().positive(),
});

export default function SendRequestPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [activeRequests, setActiveRequests] = useLocalStorage<UrgentRequest[]>("activeRequests", MOCK_ACTIVE_REQUESTS);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodType: "",
      quantity: 1,
      urgency: "Moderate",
      hospital: "",
      location: "",
      radius: 5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newRequest: UrgentRequest = {
      id: `req${Date.now()}`,
      ...values,
      timePosted: new Date().toISOString(),
      status: "Active",
    };

    setActiveRequests([newRequest, ...activeRequests]);

    toast({
      title: "Request Sent!",
      description: "Your urgent request has been broadcasted.",
    });

    router.push("/view-alerts");
  }

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        title="Send Urgent Request"
        description="Broadcast a new request for blood donation."
      />
      <div className="flex-1 p-6 flex justify-center items-start">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>New Request Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="hospital"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Hospital Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., City General Hospital" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="location"
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
                </div>

                <FormField
                  control={form.control}
                  name="radius"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Broadcast Radius</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => field.onChange(Number(value))}
                          defaultValue={String(field.value)}
                          className="flex items-center space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="5" />
                            </FormControl>
                            <FormLabel className="font-normal">5 km</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="10" />
                            </FormControl>
                            <FormLabel className="font-normal">10 km</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Send Request
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
