import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>

      <main className="text-center text-white p-4 z-10 flex flex-col items-center">
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

      <footer className="absolute bottom-4 text-white/70 z-10">
        <Link href="/dashboard" className="text-sm hover:text-white transition-colors">
          Go to Main Dashboard
        </Link>
      </footer>
    </div>
  );
}
