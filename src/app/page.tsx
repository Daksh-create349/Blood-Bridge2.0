
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, HeartPulse, Users } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://cdn.pixabay.com/video/2023/11/18/189681-886028714_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      <main className="text-center text-white p-4 z-20 flex flex-col items-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Welcome to Blood Bridge
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-300 font-light max-w-2xl">
          Bridging the gap between need & donor. Instantly connect with a network of hospitals and donors to save lives when it matters most.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Card className="bg-card/80 backdrop-blur-sm border-white/10 text-card-foreground transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">For Hospitals</CardTitle>
              <CardDescription>Urgently need blood? Alert donors now.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/urgent-request">
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

       <section className="w-full z-20 py-20 px-4 text-white text-center">
        <h2 className="text-4xl font-bold font-headline mb-4">The Lifeline Connection</h2>
        <p className="text-neutral-300 max-w-3xl mx-auto mb-12">
            Blood Bridge was born from a simple yet powerful idea: to leverage technology to eliminate delays in emergency blood supply. Every second counts in a medical crisis, and our platform is designed to be the fastest, most efficient bridge between blood banks, hospitals, and volunteer donors.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-white/10 text-card-foreground text-center">
             <CardHeader>
              <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                <HeartPulse className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">Save Lives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Reduce response times and save lives during critical emergencies.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-white/10 text-card-foreground text-center">
            <CardHeader>
               <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">Build Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect donors, hospitals, and blood banks to build a strong, responsive community network.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-white/10 text-card-foreground text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">Innovate with AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use AI to provide intelligent forecasting and request analysis to stay ahead of shortages.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="absolute bottom-4 text-white/70 z-20">
        <Link href="/dashboard" className="text-sm hover:text-white transition-colors">
          Go to Main Dashboard
        </Link>
      </footer>
    </div>
  );
}
