"use client";
import { initFhevm, createInstance, FhevmInstance } from "fhevmjs";
import { CONTRACT_ADDRESS } from "./contract";

let fhevmInstance: FhevmInstance | null = null;
let initPromise: Promise<FhevmInstance> | null = null;

export async function initializeFHE(): Promise<FhevmInstance> {
  // Return cached instance if available
  if (fhevmInstance) return fhevmInstance;
  
  // If already initializing, wait for that promise
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      console.log("Initializing FHE...");
      
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("No ethereum provider found. Please connect wallet first.");
      }

      await initFhevm();
      
      fhevmInstance = await createInstance({
        chainId: 84532,
        kmsContractAddress: "0x9D6891A6240D6130c54ae243d8005063D05fE14b",
        aclContractAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
        networkUrl: "https://sepolia.base.org",
        gatewayUrl: "https://gateway.base-sepolia.inco.org",
        publicKeyUrl: "https://gateway.base-sepolia.inco.org/fhevm/public-key",
      });

      console.log("✅ FHE initialized successfully");
      return fhevmInstance;
    } catch (error: any) {
      console.error("FHE initialization error:", error.message);
      // Reset promise to allow retry on next call
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}

export async function encryptBidAmount(amount: bigint, userAddress: string): Promise<Uint8Array> {
  const instance = await initializeFHE();
  
  console.log("Creating encrypted input...");
  const input = instance.createEncryptedInput(CONTRACT_ADDRESS, userAddress);
  input.add256(amount);
  
  const encrypted = await input.encrypt();
  console.log("✅ Encryption successful");
  
  return encrypted.data;
}

export function ethToWei(eth: string): bigint {
  const [whole, decimal = ""] = eth.split(".");
  const paddedDecimal = decimal.padEnd(18, "0").slice(0, 18);
  return BigInt(whole + paddedDecimal);
}