import { initFhevm, createInstance, FhevmInstance } from "fhevmjs";

let fhevmInstance: FhevmInstance | null = null;

const CONFIG = {
  chainId: 84532,
  networkUrl: "https://sepolia.base.org",
  gatewayUrl: "https://gateway.inco.org",
  aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
};

export async function initializeFHE(): Promise<FhevmInstance> {
  if (fhevmInstance) {
    return fhevmInstance;
  }

  try {
    await initFhevm();

    fhevmInstance = await createInstance({
      chainId: CONFIG.chainId,
      networkUrl: CONFIG.networkUrl,
      gatewayUrl: CONFIG.gatewayUrl,
      aclAddress: CONFIG.aclAddress,
    });

    console.log("✅ FHE initialized successfully");
    return fhevmInstance;
  } catch (error) {
    console.error("❌ FHE initialization failed:", error);
    throw error;
  }
}

export function getFHEInstance(): FhevmInstance {
  if (!fhevmInstance) {
    throw new Error("FHE not initialized. Call initializeFHE() first.");
  }
  return fhevmInstance;
}

export async function encryptBidAmount(
  amount: bigint,
  contractAddress: string,
  userAddress: string
): Promise<Uint8Array> {
  const fhe = await initializeFHE();
  
  const input = fhe.createEncryptedInput(contractAddress, userAddress);
  input.add256(amount);
  
  const encrypted = await input.encrypt();
  return encrypted.data;
}

export { CONFIG };