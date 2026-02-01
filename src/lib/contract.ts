export const CONTRACT_ADDRESS = "0x3520b04CC5F2171c24B4e8271F2455F74c72dD24";
export const CHAIN_ID = 84532;

export const INCO_CONFIG = {
  chainId: 84532,
  networkUrl: "https://base-sepolia-rpc.publicnode.com",
  gatewayUrl: "https://gateway.inco.org",
  aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
};

export const CONTRACT_ABI = [
  "function endAt() view returns (uint256)",
  "function minBidAmount() view returns (uint256)",
  "function auctionEnded() view returns (bool)",
  "function deposits(address) view returns (uint256)",
  "function hasBid(address) view returns (bool)",
  "function getBidderCount() view returns (uint256)",
  "function isActive() view returns (bool)",
  "function timeRemaining() view returns (uint256)",
  "function seller() view returns (address)",
  "function bid(bytes calldata encryptedAmount) payable",
  "function endAuction()",
  "function claimRefund()",
];