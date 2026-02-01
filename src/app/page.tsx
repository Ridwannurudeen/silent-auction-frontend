"use client";
import { AuctionStatus } from "@/components/AuctionStatus";
import { BidForm } from "@/components/BidForm";
import { AuctionActions } from "@/components/AuctionActions";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Silent Auction</h1>
        <p className="text-xl text-gray-400">Place secret bids that nobody can see until the auction ends.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-700 text-center">
          <div className="text-3xl mb-4">🔐</div>
          <h3 className="text-white font-semibold mb-2">Encrypt Your Bid</h3>
          <p className="text-gray-400 text-sm">Bids encrypted client-side using FHE</p>
        </div>
        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-700 text-center">
          <div className="text-3xl mb-4">⛓️</div>
          <h3 className="text-white font-semibold mb-2">Stored On-Chain</h3>
          <p className="text-gray-400 text-sm">Computed without revealing values</p>
        </div>
        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-700 text-center">
          <div className="text-3xl mb-4">🏆</div>
          <h3 className="text-white font-semibold mb-2">Winner Revealed</h3>
          <p className="text-gray-400 text-sm">Decrypted only when auction ends</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <AuctionStatus />
          <AuctionActions />
        </div>
        <div>
          <BidForm />
        </div>
      </div>
    </div>
  );
}