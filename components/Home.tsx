"use client";

import { useRouter } from "next/navigation";
import { Shield, Lock, Zap, ArrowRight } from "lucide-react";

export function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050816] text-white overflow-hidden px-6 py-14">
      {/* Background Glows — blue/cyan to match create page */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-blue-800/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Brand name */}
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400/60 mb-6 sm:mt-[-25px]">
          BlinkChat
        </p>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 mb-8">
          <Shield size={13} />
          End-to-End Private Messaging
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]">
          Chat freely.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Leave No Trace.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Instant, self-destructing chat rooms — gone in 10 minutes. No
          sign-ups, no logs. Just secure, anonymous conversations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={() => router.push("/create")}
            className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-900/40 hover:shadow-blue-500/30 font-semibold text-lg w-full sm:w-auto"
          >
            Create Private Room
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <button
            onClick={() => router.push("/join")}
            className="px-10 py-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 font-semibold text-lg w-full sm:w-auto"
          >
            Join with Code
          </button>
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            How it works
          </span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap size={22} className="text-cyan-400" />,
              title: "10-Minute Rooms",
              desc: "Conversations auto-delete after 10 minutes. No backups, ever.",
              accent: "cyan",
            },
            {
              icon: <Lock size={22} className="text-blue-400" />,
              title: "No Accounts",
              desc: "No sign-ups, no emails. Jump in instantly with an anonymous name.",
              accent: "blue",
            },
            {
              icon: <Shield size={22} className="text-blue-300" />,
              title: "Private by Design",
              desc: "Built for anonymity. No tracking, no stored data, no logs.",
              accent: "blue",
            },
          ].map(({ icon, title, desc, accent }) => (
            <div
              key={title}
              className={`group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-${accent}-500/20 hover:bg-white/[0.05] transition-all duration-300 text-left`}
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-${accent}-500/10 mb-4`}
              >
                {icon}
              </div>
              <h3 className="font-semibold text-base text-white mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom footnote */}
        <p className="mt-12 text-xs text-muted-foreground tracking-wide">
          No data stored · Rooms expire automatically · Open instantly
        </p>
      </div>
    </div>
  );
}