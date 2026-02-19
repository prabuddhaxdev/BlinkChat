"use client";

import { useRouter } from "next/navigation";
import { Shield, Lock, Zap } from "lucide-react";

export function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-6 py-14 sm:py-14">
      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full" />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-md">
          <Shield size={16} className="text-purple-400" />
          End-to-End Private Messaging
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          Chat Freely.
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Leave No Trace.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
          Create instant, self-destructing chat rooms that disappear after 10
          minutes. No accounts. No history. Just secure, anonymous
          conversations.
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button
            onClick={() => router.push("/create")}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-700/30 font-semibold text-lg w-full sm:w-auto"
          >
            Create Private Room
          </button>

          <button
            onClick={() => router.push("/join")}
            className="px-10 py-4 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 font-semibold text-lg w-full sm:w-auto"
          >
            Join with Code
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-3 gap-8 pt-10 border-t border-white/10">
          <div>
            <div className="flex justify-center">
              <Zap className="text-indigo-400" size={28} />
            </div>
            <h3 className="font-semibold text-lg">10-Minute Rooms</h3>
            <p className="text-gray-400 text-sm">
              Conversations auto-delete after 10 minutes. No backups.
            </p>
          </div>

          <div>
            <div className="flex justify-center">
              <Lock className="text-purple-400" size={28} />
            </div>
            <h3 className="font-semibold text-lg">No Accounts</h3>
            <p className="text-gray-400 text-sm">
              No signups. No emails. Just enter and chat.
            </p>
          </div>

          <div>
            <div className="flex justify-center">
              <Shield className="text-blue-400" size={28} />
            </div>
            <h3 className="font-semibold text-lg">Private by Design</h3>
            <p className="text-gray-400 text-sm">
              Built for anonymity. No tracking. No stored data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
