"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { useUsername } from "@/hooks/useUsername";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateRoomPage() {
  const { username } = useUsername();
  const router = useRouter();

  const { mutate: createRoom, isPending } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();
      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }
    },
  });

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#050816] text-white overflow-hidden px-6 py-10">
      {/* 🔵 Blue Glows */}
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
            A private, self-destructing chat room.
          </p>
        </div>

        {/* 🧊 Premium Glass Card */}
        <Card className="bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-blue-900/20 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Create Secure Room
            </CardTitle>
            <CardDescription className="text-gray-400 space-y-1">
              <p>
                Start a private chat room that self-desucts after 10 minutes.
              </p>
              <p>
                You’ll join anonymously with a random name.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
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

            {/* 🔥 Blue Glow Button */}
            <Button
              onClick={() => createRoom()}
              disabled={isPending}
              size="lg"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-800/40 hover:shadow-blue-500/40 font-semibold tracking-wide"
            >
              {isPending ? "Creating secure room..." : "CREATE SECURE ROOM"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
