"use client";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAuctionStatus } from "@/hooks/useAuction";

export function AuctionStatus() {
  const { status, loading } = useAuctionStatus();
  const [countdown, setCountdown] = useState("--:--:--");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    const updateCountdown = () => {
      const endAtSeconds = Number(status.endAt);
      const nowSeconds = Math.floor(Date.now() / 1000);
      const remaining = endAtSeconds - nowSeconds;

      if (remaining <= 0) {
        setCountdown("Ended");
        return;
      }

      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      setCountdown(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [status, mounted, loading]);

  if (!mounted || loading) {
    return (
      <div className="bg-dark-100 rounded-2xl p-6 border border-gray-700">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          <div className="h-20 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-100 rounded-2xl p-6 border border-gray-700 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Auction Status</h2>
        <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
          🟢 Live
        </span>
      </div>
      <div className="bg-dark-200 rounded-xl p-6 text-center">
        <p className="text-gray-400 text-sm mb-2">Time Remaining</p>
        <p className="text-4xl font-mono font-bold text-primary-400">{countdown}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-200 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Min Bid</p>
          <p className="text-white text-lg font-semibold">{formatEther(status.minBidAmount)} ETH</p>
        </div>
        <div className="bg-dark-200 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Bidders</p>
          <p className="text-white text-lg font-semibold">{status.bidderCount.toString()}</p>
        </div>
      </div>
      <div className="bg-primary-500/10 rounded-xl p-4 border border-primary-500/30">
        <p className="text-primary-400 font-medium">🔐 Encrypted Bids</p>
        <p className="text-gray-400 text-sm">Nobody can see bid amounts until the auction ends.</p>
      </div>
    </div>
  );
}