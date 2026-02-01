"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { usePlaceBid, useAuctionStatus } from "@/hooks/useAuction";

export function BidForm() {
  const { isConnected } = useAccount();
  const { status } = useAuctionStatus();
  const { placeBid, isEncrypting, isPending, isConfirming, isSuccess, error, txHash, reset } = usePlaceBid();
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => { 
    if (isSuccess) setBidAmount(""); 
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidAmount || parseFloat(bidAmount) <= 0) return;
    placeBid(bidAmount, bidAmount);
  };

  const isProcessing = isEncrypting || isPending || isConfirming;
  const hasBidAmount = bidAmount && parseFloat(bidAmount) > 0;
  const canBid = isConnected && hasBidAmount && !isProcessing;

  return (
    <div className="bg-dark-100 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Place Your Secret Bid</h2>
      {isSuccess && txHash ? (
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
          <p className="text-green-400 font-medium">🎉 Bid placed successfully!</p>
          <a href={`https://sepolia.basescan.org/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-primary-400 text-sm underline">View Transaction →</a>
          <button onClick={reset} className="block mt-2 text-gray-400 text-sm hover:text-white">Place another bid</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Bid Amount (ETH)</label>
            <div className="relative">
              <input 
                type="number" 
                step="0.001" 
                min="0" 
                value={bidAmount} 
                onChange={(e) => setBidAmount(e.target.value)} 
                placeholder="0.00" 
                disabled={isProcessing} 
                className="w-full bg-dark-200 border border-gray-600 rounded-xl px-4 py-3 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-primary-500" 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">ETH</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">Min: {formatEther(status.minBidAmount)} ETH</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div className="bg-dark-200 rounded-xl p-4 text-gray-400 text-sm">
            🔒 Your bid will be encrypted before submission.
          </div>
          
          {!isConnected ? (
            <p className="text-center text-gray-400">Connect wallet to place a bid</p>
          ) : (
            <button 
              type="submit" 
              disabled={!canBid}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                canBid 
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:opacity-90 cursor-pointer" 
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isEncrypting ? "🔐 Encrypting..." : isPending ? "⏳ Confirm in wallet..." : isConfirming ? "⛓️ Confirming..." : "🎯 Place Secret Bid"}
            </button>
          )}
        </form>
      )}
    </div>
  );
}