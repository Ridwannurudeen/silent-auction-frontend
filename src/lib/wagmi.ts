"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Silent Auction",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "demo",
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http("https://base-sepolia-rpc.publicnode.com"),
  },
  ssr: true,
});