"use client";
import { useState, useCallback, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { baseSepolia } from "wagmi/chains";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { encryptBidAmount, ethToWei } from "@/lib/fhe";

export function useAuctionStatus() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use demo values - auction ends in 48 hours from now
  const demoEndAt = mounted ? BigInt(Math.floor(Date.now() / 1000) + 172800) : BigInt(0);

  const status = {
    endAt: demoEndAt,
    minBidAmount: BigInt(10000000000000000), // 0.01 ETH
    auctionEnded: false,
    bidderCount: BigInt(0),
    isActive: true,
    timeRemaining: BigInt(172800),
    userDeposit: BigInt(0),
    userHasBid: false,
  };

  return { status, loading: !mounted, refetch: () => {} };
}

export function usePlaceBid() {
  const { address } = useAccount();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContract, data: hash, isPending, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const placeBid = useCallback(async (bidAmountEth: string, depositAmountEth: string) => {
    if (!address) { 
      setError("Please connect your wallet first."); 
      return; 
    }
    
    setError(null);
    setIsEncrypting(true);
    
    try {
      const bidWei = ethToWei(bidAmountEth);
      const depositWei = parseEther(depositAmountEth);
      
      console.log("Encrypting bid:", bidWei.toString());
      const encrypted = await encryptBidAmount(bidWei, address);
      console.log("✅ Encrypted successfully");
      
      setIsEncrypting(false);
      
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "bid",
        args: [encrypted],
        value: depositWei,
        chainId: baseSepolia.id,
      });
    } catch (err: any) {
      console.error("Bid error:", err);
      setError(err.message || "Failed to place bid. Please try on a different network.");
      setIsEncrypting(false);
    }
  }, [address, writeContract]);

  return { placeBid, isEncrypting, isPending, isConfirming, isSuccess, error, txHash: hash, reset };
}

export function useEndAuction() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const endAuction = useCallback(() => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "endAuction",
      chainId: baseSepolia.id,
    });
  }, [writeContract]);
  return { endAuction, isPending, isConfirming, isSuccess, txHash: hash };
}

export function useClaimRefund() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const claimRefund = useCallback(() => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "claimRefund",
      chainId: baseSepolia.id,
    });
  }, [writeContract]);
  return { claimRefund, isPending, isConfirming, isSuccess, txHash: hash };
}