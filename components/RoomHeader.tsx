"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bomb, Link2, QrCode, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CopyButton } from "./CopyButton";
import { CountdownTimer } from "./CountdownTimer";

interface RoomHeaderProps {
  roomId: string;
  timeToLive?: number;
  onDestroy: () => void;
  onExpire?: () => void;
  roomUrl: string;
}

export function RoomHeader({
  roomId,
  timeToLive,
  onDestroy,
  onExpire,
  roomUrl,
}: RoomHeaderProps) {
  const [shareLinkStatus, setShareLinkStatus] = useState("SHARE LINK");
  const [isQrOpen, setIsQrOpen] = useState(false);

  const handleShareLink = () => {
    navigator.clipboard.writeText(roomUrl);
    setShareLinkStatus("COPIED!");
    setTimeout(() => setShareLinkStatus("SHARE LINK"), 2000);
  };

  return (
    <>
      <header className="border-b px-3 sm:px-4 py-2.5 sm:py-3 bg-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-6 min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-medium whitespace-nowrap shrink-0">
                ROOM ID
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                <Badge
                  variant="outline"
                  className="font-mono text-success rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs md:text-sm max-w-[100px] min-[375px]:max-w-[140px] sm:max-w-[180px] md:max-w-none truncate shrink"
                >
                  {roomId}
                </Badge>
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                  <CopyButton
                    text={roomId}
                    label="COPY ID"
                    className="h-6 sm:h-7 px-1.5 sm:px-3 rounded-full shrink-0"
                  />
                  <Button
                    onClick={handleShareLink}
                    variant="ghost"
                    size="sm"
                    className="h-6 sm:h-7 rounded-full gap-1 sm:gap-1.5 px-1.5 sm:px-4 shrink-0"
                  >
                    <Link2 className="size-4 sm:size-4 shrink-0" />
                    <span className="hidden min-[375px]:inline sm:inline text-[10px] sm:text-xs whitespace-nowrap">
                      {shareLinkStatus}
                    </span>
                  </Button>
                  <Button
                    onClick={() => setIsQrOpen(true)}
                    variant="ghost"
                    size="xs"
                    disabled={!roomUrl}
                    className="h-6 sm:h-7 rounded-full px-1.5 sm:px-2 shrink-0"
                    aria-label="Show room QR code"
                  >
                    <QrCode className="size-4 sm:size-4.5 shrink-0" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-medium whitespace-nowrap shrink-0">
                SELF-DESTRUCT
              </span>
              <CountdownTimer initialTtl={timeToLive} onExpire={onExpire} />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
            <Button
              onClick={onDestroy}
              variant="destructive"
              size="xs"
              className="gap-2 sm:gap-2 rounded-full h-7 w-full sm:w-auto shrink-0 text-[12px] sm:text-xs px-3 sm:px-4"
            >
              <Bomb className="size-3 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">
                DESTROY NOW
              </span>
              <span className="sm:hidden whitespace-nowrap">DESTROY</span>
            </Button>
          </div>
        </div>
      </header>

      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl border bg-card p-4 sm:p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
                Scan to Join Room
              </h2>
              <Button
                onClick={() => setIsQrOpen(false)}
                variant="ghost"
                size="icon-xs"
                className="rounded-full"
                aria-label="Close QR code modal"
              >
                <X className="size-3.5" />
              </Button>
            </div>

            <div className="rounded-xl bg-white p-3 sm:p-4 flex items-center justify-center">
              <QRCodeSVG
                value={roomUrl}
                size={220}
                includeMargin
                className="h-auto w-full max-w-[220px]"
              />
            </div>

            <p className="mt-3 text-[10px] sm:text-xs text-muted-foreground break-all">
              {roomUrl}
            </p>

            <div className="mt-3 flex justify-end">
              <CopyButton
                text={roomUrl}
                label="COPY LINK"
                variant="outline"
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
