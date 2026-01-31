import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

import { redis } from "./lib/redis";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const roomMatch = pathname.match(/^\/room\/([^/]+)$/);
  if (!roomMatch) return NextResponse.redirect(new URL("/", req.url));

  const roomId = roomMatch[1];

  const meta = await redis.hgetall<{ connected: string[]; createdAt: string }>(
    `meta:${roomId}`,
  );

  if (!meta)
    return NextResponse.redirect(new URL("/?error=room-not-found", req.url));

  const exitingToken = req.cookies.get("x-auth-token")?.value;

  // user is allowed to join room
  if (exitingToken && meta.connected.includes(exitingToken))
    return NextResponse.next();

  // user is not allowed to join room
  if (meta.connected.length >= 3)
    return NextResponse.redirect(new URL("/?error=room-full", req.url));

  const response = NextResponse.next();

  const token = nanoid();

  response.cookies.set("x-auth-token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  await redis.hset(`meta:${roomId}`, {
    connected: [...meta.connected, token],
  });

  return response;
}

export const config = {
  matcher: "/room/:path*",
};
