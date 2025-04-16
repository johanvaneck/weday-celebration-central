
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface CountdownCardProps {
  weddingDate?: Date;
}

export function CountdownCard({ weddingDate }: CountdownCardProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // If no wedding date is provided, use a default date 6 months from now
  const targetDate = weddingDate || new Date(new Date().setMonth(new Date().getMonth() + 6));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="weday-gradient p-4 text-white">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5" />
          <span>Countdown to Your Big Day</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="rounded-lg bg-weday-light/20 p-3">
            <p className="text-2xl font-bold text-weday-primary">{countdown.days}</p>
            <p className="text-xs text-muted-foreground">Days</p>
          </div>
          <div className="rounded-lg bg-weday-light/20 p-3">
            <p className="text-2xl font-bold text-weday-primary">{countdown.hours}</p>
            <p className="text-xs text-muted-foreground">Hours</p>
          </div>
          <div className="rounded-lg bg-weday-light/20 p-3">
            <p className="text-2xl font-bold text-weday-primary">{countdown.minutes}</p>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </div>
          <div className="rounded-lg bg-weday-light/20 p-3">
            <p className="text-2xl font-bold text-weday-primary">{countdown.seconds}</p>
            <p className="text-xs text-muted-foreground">Seconds</p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {targetDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
