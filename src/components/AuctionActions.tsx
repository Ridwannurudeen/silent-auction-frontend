"use client";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { useAuctionStatus, useEndAuction, useClaimRefund } from "@/hooks/useAuction";

export function AuctionActions() {
  const { isConnected } = useAccount();
  const { status, refetch } = useAuctionStatus();
  const { endAuction, isPending: isEnding, isConfirming: confirmEnd, isSuccess: endSuccess, txHash: endTx } = useEndAuction();
  const { claimRefund, isPending: isClaiming, isConfirming: confirmClaim, isSuccess: claimSuccess, txHash: claimTx } = useClaimRefund();

  if (!isConnected || !status) return null;
  const canEnd = !status.isActive && !status.auctionEnded && Number(status.timeRemaining) === 0;
  const canClaim = status.auctionEnded && status.userDeposit > BigInt(0);
  if (!canEnd && !canClaim) return null;

  return (
    <div className="bg-dark-100 rounded-2xl p-6 border border-gray-700 space-y-4">
      <h2 className="text-xl font-bold text-white">Actions</h2>
      {canEnd && (
        <div className="space-y-3">
          <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30 text-yellow-400 text-sm">⏰ Auction time ended. Finalize to reveal winner.</div>
          {endSuccess ? (
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
              <p className="text-green-400">✅ Auction ended!</p>
              <a href={`https://sepolia.basescan.org/tx/${endTx}`} target="_blank" className="text-primary-400 text-sm underline">View TX</a>
            </div>
          ) : (
            <button onClick={endAuction} disabled={isEnding || confirmEnd} className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black font-semibold rounded-xl">
              {isEnding ? "Confirm..." : confirmEnd ? "Confirming..." : "🏁 End Auction"}
            </button>
          )}
        </div>
      )}
      {canClaim && (
        <div className="space-y-3">
          <div className="bg-primary-500/10 rounded-xl p-4 border border-primary-500/30 text-primary-400 text-sm">💰 You have {formatEther(status.userDeposit)} ETH to claim.</div>
          {claimSuccess ? (
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
              <p className="text-green-400">✅ Refund claimed!</p>
              <a href={`https://sepolia.basescan.org/tx/${claimTx}`} target="_blank" className="text-primary-400 text-sm underline">View TX</a>
            </div>
          ) : (
            <button onClick={claimRefund} disabled={isClaiming || confirmClaim} className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-black font-semibold rounded-xl">
              {isClaiming ? "Confirm..." : confirmClaim ? "Confirming..." : "💸 Claim Refund"}
            </button>
          )}
        </div>
      )}
      <button onClick={refetch} className="w-full py-2 text-gray-400 hover:text-white text-sm">↻ Refresh</button>
    </div>
  );
}