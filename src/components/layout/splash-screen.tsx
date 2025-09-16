
"use client";

import BloodDropIcon from "@/components/icons/blood-drop-icon";

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary animate-in fade-in duration-1000">
      <div className="relative flex items-center justify-center">
        {/* Pulsing background effect */}
        <div className="absolute h-24 w-24 rounded-full bg-primary/20 animate-pulse delay-500"></div>
        <div className="absolute h-32 w-32 rounded-full bg-primary/10 animate-pulse delay-700"></div>
        
        {/* Logo */}
        <BloodDropIcon className="h-20 w-20 animate-in zoom-in-50 duration-1000" />
      </div>
      
      <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500">
        <h1 className="text-5xl font-headline font-bold text-foreground">
          Blood Bridge
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bridging the gap between need & donor.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
