
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { BrainCircuit, HeartPulse, Users } from 'lucide-react';
import { useTheme } from 'next-themes';


function AboutUsContent() {
  const features = [
    {
      icon: HeartPulse,
      title: "Save Lives",
      description: "Reduce response times and save lives during critical emergencies with real-time alerts.",
      videoSrc: "https://cdn.pixabay.com/video/2019/02/23/21617-319452308_large.mp4"
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect donors, hospitals, and blood banks to build a strong, responsive community network.",
      videoSrc: "https://media.istockphoto.com/id/1497158922/video/close-up-shot-of-two-blood-bags-from-donor-hanging-on-the-stand-in-donation-center-or.mp4?s=mp4-640x640-is&k=20&c=RYDBYqDnXIblzhLpnLjTzM34HUdZhmv-vfY5dKoHT7Q="
    },
    {
      icon: BrainCircuit,
      title: "Innovate with AI",
      description: "Use AI to provide intelligent forecasting and request analysis to stay ahead of shortages.",
      videoSrc: "https://media.istockphoto.com/id/1491463133/video/illustrative-3d-animation-of-neural-network-concept-chatbot-artificial-intelligence-deep.mp4?s=mp4-640x640-is&k=20&c=GfH4iLh-gzyr0Ii2-LNoGFbzOdRspiD3pqzI9_oRgqg="
    }
  ];

  return (
     <div className="py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-lg border-white/10 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 150}ms`}}>
              <div className="relative h-40">
                  <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover z-0"
                  >
                      <source src={feature.videoSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/50 z-10"></div>
                  <div className="relative z-20 flex items-center justify-center h-full">
                       <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary border-2 border-primary/50">
                          <feature.icon className="h-8 w-8" />
                      </div>
                  </div>
              </div>
              <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-foreground font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                  <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <main className="text-center p-4 z-20 flex flex-col items-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Blood Bridge
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
          Bridging the gap between need & donor.
        </p>

         <div className="mt-12">
            <Link href="/dashboard">
                <Button size="lg">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      </main>
    </div>
  );
}
