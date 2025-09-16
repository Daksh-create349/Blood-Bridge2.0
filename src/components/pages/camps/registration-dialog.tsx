
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { BloodCamp } from "@/lib/types";
import { Camera, Download, Loader2, User, FileImage, QrCode } from "lucide-react";
import Webcam from "react-webcam";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

interface RegistrationDialogProps {
  camp: BloodCamp | null;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  age: z.coerce.number().min(18, "You must be at least 18 to donate.").max(65, "You must be at most 65 to donate."),
  idProof: z.any().refine(file => file?.length > 0, "ID proof is required."),
});

type RegistrationData = z.infer<typeof formSchema> & { photo: string };

const steps = {
  DETAILS: 1,
  CAPTURE: 2,
  TICKET: 3,
};

export function RegistrationDialog({ camp, onClose }: RegistrationDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(steps.DETAILS);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", age: 18, idProof: undefined },
  });

  useEffect(() => {
    // Reset state when dialog opens for a new camp
    if (camp) {
      setStep(steps.DETAILS);
      setRegistrationData(null);
      setImgSrc(null);
      form.reset();
    }
  }, [camp, form]);

  if (!camp) {
    return null;
  }

  const handleDetailsSubmit = (values: z.infer<typeof formSchema>) => {
    setRegistrationData({ ...values, photo: "" });
    setStep(steps.CAPTURE);
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  };
  
  const handleConfirmCapture = () => {
      if (imgSrc && registrationData) {
        setRegistrationData({ ...registrationData, photo: imgSrc });
        setStep(steps.TICKET);
        toast({
            title: "Registration Successful!",
            description: "Your participation ticket has been generated."
        })
      }
  }

  const downloadTicket = async () => {
    const { default: html2canvas } = await import('html2canvas');
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current);
      const link = document.createElement('a');
      link.download = `blood-donation-ticket-${registrationData?.name?.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case steps.DETAILS:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Register for: {camp.name}</DialogTitle>
              <DialogDescription>
                Fill in your details to participate in this blood donation camp.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleDetailsSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idProof"
                  render={({ field: { onChange, value, ...rest }}) => (
                    <FormItem>
                      <FormLabel>Identity Proof</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept="image/*,.pdf" 
                          onChange={(e) => onChange(e.target.files)} 
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Next: Capture Photo</Button>
                </div>
              </form>
            </Form>
          </>
        );

      case steps.CAPTURE:
        return (
            <>
                <DialogHeader>
                    <DialogTitle>Capture Your Photo</DialogTitle>
                    <DialogDescription>
                        Please position your face in the center of the frame.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                    <div className="w-full aspect-video bg-muted rounded-md overflow-hidden flex justify-center items-center">
                        {imgSrc ? (
                            <Image src={imgSrc} alt="Your captured photo" width={400} height={300} className="object-contain" />
                        ) : (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                     <div className="flex gap-4">
                        {imgSrc ? (
                            <>
                                <Button variant="outline" onClick={() => setImgSrc(null)}>Retake Photo</Button>
                                <Button onClick={handleConfirmCapture}>Confirm & Generate Ticket</Button>
                            </>
                        ) : (
                            <Button onClick={capture}>
                                <Camera className="mr-2 h-4 w-4" />
                                Capture Photo
                            </Button>
                        )}
                    </div>
                </div>
            </>
        );

      case steps.TICKET:
        if (!registrationData) return null;
        return (
            <>
                <DialogHeader>
                    <DialogTitle>Your Participation Ticket</DialogTitle>
                    <DialogDescription>
                        Thank you for registering! Please present this ticket at the camp.
                    </DialogDescription>
                </DialogHeader>
                <div ref={ticketRef} className="bg-card p-6 rounded-lg border border-border my-4 text-card-foreground">
                    <div className="flex gap-6 items-start">
                        <div className="flex-grow space-y-4">
                            <h3 className="text-xl font-bold font-headline text-primary">{camp.name}</h3>
                            <div className="text-sm space-y-2">
                                <p><span className="font-semibold">Participant:</span> {registrationData.name}</p>
                                <p><span className="font-semibold">Age:</span> {registrationData.age}</p>
                                <p><span className="font-semibold">Date:</span> {new Date(camp.date).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Location:</span> {camp.location}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            {registrationData.photo && (
                                <Image
                                    src={registrationData.photo}
                                    alt="Participant photo"
                                    width={100}
                                    height={100}
                                    className="rounded-md border-2 border-primary/50"
                                />
                            )}
                            <Image src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Donation-Ticket" alt="QR Code" width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={downloadTicket}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Ticket
                    </Button>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
            </>
        );
    }
  };

  return (
    <Dialog open={!!camp} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-xl">
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}
