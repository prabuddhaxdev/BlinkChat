"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  roomId: string;
  username?: string;
  onJoin: () => void;
  isJoining: boolean;
}

export function JoinRoomScreen({ roomId, username, onJoin, isJoining }: Props) {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#050816] text-white overflow-hidden px-6 py-14">
      {/* 🔵 Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />

      <div className="relative z-10 w-full max-w-md space-y-10">
        {/* 🔷 Brand Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            BlinkChat
          </h1>

          <p className="text-gray-400 text-sm sm:text-base">
            You’re joining a secure private room
          </p>
        </div>

        <Card className="bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-blue-900/20 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Join Secure Room
            </CardTitle>

            <CardDescription className="text-gray-400">
              This room was shared with you.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Room ID */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400 tracking-wide uppercase">
                Room ID
              </p>

              <p className="text-sm font-mono text-cyan-300 break-all bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                {roomId}
              </p>
            </div>

            {/* Username Preview */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400 tracking-wide uppercase">
                You’ll join as
              </p>

              <p className="text-sm font-semibold text-blue-300 truncate bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                {username ?? "Generating name..."}
              </p>
            </div>

            <Button
              onClick={onJoin}
              disabled={isJoining || !username}
              size="lg"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-800/40 hover:shadow-blue-500/40 font-semibold tracking-wide"
            >
              {isJoining ? "Joining secure room..." : "JOIN SECURE ROOM"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
