"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-dark-200/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔐</span>
          <div>
            <h1 className="text-xl font-bold text-white">Silent Auction</h1>
            <p className="text-xs text-gray-400">Powered by Inco Lightning</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 rounded-full border border-primary-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-primary-400 text-sm">Base Sepolia</span>
          </div>
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>
      </div>
    </header>
  );
}