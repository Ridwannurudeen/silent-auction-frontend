import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Silent Auction | Encrypted Sealed-Bid Auction",
  description: "A sealed-bid NFT auction with FHE encryption on Base Sepolia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
            Built with 🔐 Inco Lightning on Base Sepolia
          </footer>
        </Providers>
      </body>
    </html>
  );
}