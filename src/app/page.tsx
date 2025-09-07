
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
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

      <footer className="absolute bottom-4 text-white/70 z-20">
        <Link href="/dashboard" className="text-sm hover:text-white transition-colors">
          Go to Main Dashboard
        </Link>
      </footer>
    </div>
  );
}
