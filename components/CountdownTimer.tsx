"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface CountdownTimerProps {
  initialTtl?: number; // seconds
  onExpire?: () => void;
}

function formatTimeRemaining(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function CountdownTimer({
  initialTtl = 0,
  onExpire,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTtl);

  // Reset timer if initialTtl changes
  useEffect(() => {
    setTimeRemaining(initialTtl);
  }, [initialTtl]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, onExpire]);

  return (
    <Badge
      variant={timeRemaining <= 60 ? "destructive" : "warning"}
      className="font-mono rounded-full px-3 py-1 text-xs"
    >
      {formatTimeRemaining(Math.max(timeRemaining, 0))}
    </Badge>
  );
}
