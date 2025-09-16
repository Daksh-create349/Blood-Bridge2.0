
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
  const { theme } = useTheme();

  const lightVideoUrl = "https://media.istockphoto.com/id/1287414521/video/intravenous-medical-research-doctor-applying-tourniquet-on-black-guy-arm-before-taking-blood.mp4?s=mp4-640x640-is&k=20&c=z5dEHMc9-xR4jwxOv1Ir_fthm-DVEQmEvsLFeA2hlds=";
  const darkVideoUrl = "https://cdn.pixabay.com/video/2023/11/18/189681-886028714_large.mp4";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <video
        key={theme} // Add key to force re-render on theme change
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={theme === 'light' ? lightVideoUrl : darkVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      <main className="text-center p-4 z-20 flex flex-col items-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 dark:from-neutral-50 dark:to-neutral-400 from-neutral-900 to-neutral-600">
          Welcome to Blood Bridge
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-300 dark:text-neutral-300 text-neutral-800 font-light max-w-2xl">
          Bridging the gap between need & donor. Instantly connect with a network of hospitals and donors to save lives when it matters most.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Card className="bg-card/80 backdrop-blur-sm border-white/10 text-card-foreground transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">For Hospitals</CardTitle>
              <CardDescription>Urgently need blood? Alert donors now.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/send-request">
                <Button className="w-full" size="lg">
                  Send an Alert <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-white/10 text-card-foreground transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">For Donors</CardTitle>
              <CardDescription>See who needs your help right now.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/view-alerts">
                <Button className="w-full" variant="secondary" size="lg">
                  View Requests <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="absolute bottom-4 text-white/70 dark:text-white/70 text-black/70 z-20 flex items-center gap-6">
        <Sheet>
            <SheetTrigger asChild>
                <Link href="#" className="text-sm hover:text-foreground transition-colors">About Us</Link>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background/95 text-foreground border-t-primary/20 h-auto overflow-y-auto p-12">
                <SheetHeader className="text-center max-w-4xl mx-auto">
                <SheetTitle className="text-5xl font-bold font-headline mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400">The Lifeline Connection</SheetTitle>
                <SheetDescription className="text-muted-foreground text-lg">
                    Blood Bridge was born from a simple yet powerful idea: to leverage technology to eliminate delays in emergency blood supply. Every second counts in a medical crisis, and our platform is designed to be the fastest, most efficient bridge between blood banks, hospitals, and volunteer donors.
                </SheetDescription>
                </SheetHeader>
                <AboutUsContent />
            </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="text-sm hover:text-foreground transition-colors">
          Go to Main Dashboard
        </Link>
      </footer>
    </div>
  );
}
