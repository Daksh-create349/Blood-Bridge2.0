import BloodDropIcon from "@/components/icons/blood-drop-icon";

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white">
      <div className="animate-pulse">
        <BloodDropIcon className="h-24 w-24 text-primary" />
      </div>
      <h1 className="text-4xl font-headline font-bold mt-6 animate-bounce">
        Blood Bridge
      </h1>
    </div>
  );
};

export default SplashScreen;
