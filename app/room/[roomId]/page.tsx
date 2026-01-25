"use client";

import { useParams } from "next/navigation";

export default function RoomId() {
  const params = useParams();
  const roomId = params.roomId as string;

  return <div>{roomId}</div>;
}
