"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUsername } from "@/hooks/useUsername";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/client";

const NANOID_PATTERN = /^[A-Za-z0-9_-]{21}$/;

export default function JoinRoomPage() {
  const router = useRouter();
  const { username } = useUsername();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: checkAndJoin, isPending: isJoining } = useMutation({
    mutationFn: async (roomIdToCheck: string) => {
      if (!NANOID_PATTERN.test(roomIdToCheck)) {
        throw new Error("Invalid room ID format");
      }

      const res = await client.room.check.get({
        query: { roomId: roomIdToCheck },
      });

      if (!res.data?.exists) {
        throw new Error("Room not found or expired!");
      }

      if (res.data.isFull) {
        throw new Error("Room is full");
      }

      return roomIdToCheck;
    },
    onSuccess: (validRoomId) => {
      router.push(`/room/${validRoomId}`);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedRoomId = roomId.trim();
    if (trimmedRoomId) {
      checkAndJoin(trimmedRoomId);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text").trim();

    if (pastedText && NANOID_PATTERN.test(pastedText)) {
      setRoomId(pastedText);
      setError(null);

      setTimeout(() => {
        checkAndJoin(pastedText);
      }, 100);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#050816] text-white overflow-hidden px-6 py-14 md:py-2">
      {/* 🔵 Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />

      <div className="relative z-10 w-full max-w-md space-y-10">
        {/* 🔷 Brand Header */}
        <div className="text-center space-y-4">
          <h1
            onClick={() => router.push("/")}
            className="text-4xl sm:text-5xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-all duration-300"
          >
            BlinkChat
          </h1>

          <p className="text-gray-400 text-sm sm:text-base">
            Enter a private room instantly.
          </p>
        </div>
        <Card className="bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-blue-900/20 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Join Secure Room
            </CardTitle>
            <CardDescription className="text-gray-400 space-y-1">
              <p>Paste the room ID shared with you.</p>
              <p>You’ll join anonymously with a random name.</p>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Input
                  value={roomId}
                  onChange={(e) => {
                    setRoomId(e.target.value);
                    setError(null);
                  }}
                  onPaste={handlePaste}
                  placeholder="Paste room ID (auto-join enabled)"
                  disabled={isJoining}
                  autoFocus
                  className="w-full font-mono bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                />

                {/* Format Hint */}
                {!error && roomId && !NANOID_PATTERN.test(roomId.trim()) && (
                  <p className="text-xs text-gray-500">
                    Room ID must be 21 characters (letters, numbers, _, -)
                  </p>
                )}

                {/* Error */}
                {error && <p className="text-sm text-red-400">{error}</p>}

                {/* Username Preview */}
                <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-xs text-gray-400 tracking-wide uppercase">
                      You’ll join as
                    </p>
                    <p className="text-sm font-semibold truncate text-blue-300">
                      {username}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={
                  !roomId.trim() ||
                  isJoining ||
                  !NANOID_PATTERN.test(roomId.trim())
                }
                size="lg"
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-800/40 hover:shadow-blue-500/40 font-semibold tracking-wide text-white/90"
              >
                {isJoining ? "Joining secure room..." : "JOIN SECURE ROOM"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
