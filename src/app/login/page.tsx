"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const redirect = searchParams.get('redirect') || '/dashboard';
    
    // In a real app, you'd validate credentials here.
    // For this mock, we'll just log in.
    
    toast({
      title: "Login Successful",
      description: "Welcome, Admin!",
    });

    login(redirect);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Hospital Admin Portal</CardTitle>
        <CardDescription>
          Please log in to manage inventory.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@hospital.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Log In
          </Button>
          <Link href="/dashboard">
             <Button variant="link" size="sm">
                Cancel and go to dashboard
             </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
