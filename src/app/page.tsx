import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 -z-10" />
      
      <main className="text-center text-white p-4 z-10 flex flex-col items-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
          Welcome to Blood Bridge
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 font-light">
          Bridging the gap between need & donor.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 text-card-foreground transform hover:scale-105 transition-transform duration-300">
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
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 text-card-foreground transform hover:scale-105 transition-transform duration-300">
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

      <footer className="absolute bottom-4 text-white/70 z-10">
        <Link href="/dashboard" className="text-sm hover:text-white transition-colors">
          Go to Main Dashboard
        </Link>
      </footer>
    </div>
  );
}
