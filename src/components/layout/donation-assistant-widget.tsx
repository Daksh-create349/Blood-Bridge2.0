
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { donationAssistant, DonationAssistantInput } from "@/ai/flows/donation-assistant";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  role: "user" | "model";
  content: string;
};

export function DonationAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting message
      setMessages([
        { role: "model", content: "Hi there! I'm the Blood Bridge Donation Assistant. How can I help you today?" }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
        const history = messages.map(m => ({ role: m.role, content: m.content }));
        const assistantInput: DonationAssistantInput = { query: input, history };
        const result = await donationAssistant(assistantInput);
        const assistantMessage: Message = { role: "model", content: result.response };
        setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Assistant Error",
            description: "Sorry, I couldn't process that request. Please try again.",
        });
        // Remove the user's message if the API call fails
        setMessages(prev => prev.slice(0, -1));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground animate-in zoom-in-50"
        >
          <Bot className="h-8 w-8" />
          <span className="sr-only">Open Donation Assistant</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="fixed bottom-0 right-0 h-screen w-[400px] mt-0 rounded-none z-50 flex flex-col">
        <DrawerHeader className="flex items-center justify-between border-b">
          <DrawerTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="text-accent" />
            Donation Assistant
          </DrawerTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DrawerHeader>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "model" && (
                    <Avatar className="w-8 h-8 bg-accent text-accent-foreground">
                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                    message.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-card"
                  )}
                >
                  {message.content}
                </div>
                 {message.role === "user" && (
                    <Avatar className="w-8 h-8">
                        <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8 bg-accent text-accent-foreground">
                    <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
                <div className="bg-card max-w-[80%] rounded-lg px-4 py-3 flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
