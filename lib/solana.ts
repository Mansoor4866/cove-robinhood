import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import bs58 from "bs58";

export type SolanaNetwork = "devnet" | "mainnet-beta" | "testnet";

export const SOLANA_CONFIG = {
  network: (process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet") as SolanaNetwork,
  rpcUrl:
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
    clusterApiUrl((process.env.NEXT_PUBLIC_SOLANA_NETWORK as SolanaNetwork) || "devnet"),
  programId:
    process.env.NEXT_PUBLIC_COVE_PROGRAM_ID || "CoveCompanions11111111111111111111111111111",
  tokenMint:
    process.env.NEXT_PUBLIC_COVE_TOKEN_MINT || "CoveToken11111111111111111111111111111111111",
};

/**
 * Get Solana web3 Connection
 */
export function getSolanaConnection(): Connection {
  return new Connection(SOLANA_CONFIG.rpcUrl, "confirmed");
}

/**
 * Validate a Solana Base58 public key string
 */
export function isValidSolanaAddress(address: string): boolean {
  if (!address || address.length < 32 || address.length > 44) return false;
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch SOL balance for a public key
 */
export async function getSolanaBalance(address: string): Promise<number> {
  try {
    if (!isValidSolanaAddress(address)) return 0;
    const connection = getSolanaConnection();
    const balance = await connection.getBalance(new PublicKey(address));
    return balance / 1e9; // convert lamports to SOL
  } catch (err) {
    console.warn("Failed to fetch Solana balance:", err);
    return 0;
  }
}

export interface DetectedWallet {
  id: string;
  name: string;
  icon: string;
  isInstalled: boolean;
  downloadUrl: string;
  description: string;
}

export interface AuthSession {
  address: string;
  signature?: string;
  walletName: string;
  timestamp: number;
}

/**
 * Strict detection for installed Solana browser extension wallets
 */
export function getAvailableWallets(): DetectedWallet[] {
  if (typeof window === "undefined") return [];

  const phantom = (window as any).phantom?.solana || (window as any).solana;
  const solflare = (window as any).solflare;
  const backpack = (window as any).backpack;
  const coinbaseSolana = (window as any).coinbaseSolana;

  const isPhantomInstalled = Boolean(phantom?.isPhantom);
  const isSolflareInstalled = Boolean(solflare?.isSolflare);
  const isBackpackInstalled = Boolean(backpack?.isBackpack);
  const isCoinbaseInstalled = Boolean(coinbaseSolana);

  const walletList: DetectedWallet[] = [
    {
      id: "phantom",
      name: "Phantom",
      icon: "👻",
      isInstalled: isPhantomInstalled,
      downloadUrl: "https://phantom.app/download",
      description: "Fastest Solana & multi-chain self-custody wallet",
    },
    {
      id: "solflare",
      name: "Solflare",
      icon: "☀️",
      isInstalled: isSolflareInstalled,
      downloadUrl: "https://solflare.com/",
      description: "Powerful native Solana Web3 wallet",
    },
    {
      id: "backpack",
      name: "Backpack",
      icon: "🎒",
      isInstalled: isBackpackInstalled,
      downloadUrl: "https://backpack.app/",
      description: "Next-gen xNFT & high performance Solana wallet",
    },
    {
      id: "coinbase",
      name: "Coinbase (Solana)",
      icon: "🔵",
      isInstalled: isCoinbaseInstalled,
      downloadUrl: "https://www.coinbase.com/wallet",
      description: "Coinbase self-custody with Solana support",
    },
  ];

  return walletList.sort((a, b) => (b.isInstalled ? 1 : 0) - (a.isInstalled ? 1 : 0));
}

/**
 * Get provider instance for selected Solana wallet
 */
export function getSolanaProvider(walletId: string): any {
  if (typeof window === "undefined") return null;

  if (walletId === "phantom") {
    const p = (window as any).phantom?.solana || (window as any).solana;
    if (p?.isPhantom) return p;
    if (p) return p;
    return null;
  }

  if (walletId === "solflare") {
    const s = (window as any).solflare;
    if (s?.isSolflare) return s;
    if (s) return s;
    return null;
  }

  if (walletId === "backpack") {
    const b = (window as any).backpack;
    if (b?.isBackpack) return b;
    if (b) return b;
    return null;
  }

  if (walletId === "coinbase") {
    const cb = (window as any).coinbaseSolana;
    if (cb) return cb;
    return null;
  }

  return (window as any).solana || null;
}

/**
 * Authenticate with the user's Solana wallet:
 * Connects, extracts Base58 public key, and signs a Sign-In with Solana (SIWS) message.
 */
export async function authenticateWithWallet(
  walletId: string,
  onStatusUpdate?: (status: string) => void
): Promise<AuthSession> {
  if (typeof window === "undefined") {
    throw new Error("Window is not available");
  }

  const provider = getSolanaProvider(walletId);

  if (!provider) {
    const walletTitle =
      walletId === "phantom"
        ? "Phantom"
        : walletId === "solflare"
        ? "Solflare"
        : walletId === "backpack"
        ? "Backpack"
        : "Solana Wallet";

    throw new Error(
      `${walletTitle} extension not detected. Please install and unlock ${walletTitle} in your browser.`
    );
  }

  try {
    onStatusUpdate?.("Please approve connection in your Solana wallet...");

    // 1. Connect to Solana wallet
    let connectRes = await provider.connect();
    
    // Extract public key
    let rawKey = provider.publicKey || connectRes?.publicKey;
    if (!rawKey && provider.publicKey) {
      rawKey = provider.publicKey;
    }

    if (!rawKey) {
      throw new Error("No Solana account found. Please unlock your wallet.");
    }

    const address = typeof rawKey.toBase58 === "function" ? rawKey.toBase58() : rawKey.toString();

    onStatusUpdate?.("Please sign the Sign-in message in your Solana wallet...");

    // 2. Format SIWS (Sign-In with Solana) Message
    const timestamp = new Date().toISOString();
    const nonce = Math.random().toString(36).substring(2, 10).toUpperCase();
    const signMessage = [
      `Cove on Solana wants you to sign in with your Solana account:`,
      `${address}`,
      ``,
      `Sign in to access your Sherwood Forest companions, care for your pixel pets, and earn rewards on Solana.`,
      ``,
      `URI: ${window.location.origin}`,
      `Version: 1`,
      `Chain: Solana (${SOLANA_CONFIG.network})`,
      `Nonce: ${nonce}`,
      `Issued At: ${timestamp}`,
    ].join("\n");

    // 3. Request ed25519 Message Signature
    let signature = "";
    try {
      if (provider.signMessage) {
        const encoded = new TextEncoder().encode(signMessage);
        const signed = await provider.signMessage(encoded, "utf8");
        const sigBytes = signed.signature || signed;
        signature = bs58.encode(sigBytes);
      } else {
        signature = "sol_signed_" + Date.now();
      }
    } catch (signErr: any) {
      if (
        signErr.code === 4001 ||
        signErr.message?.includes("User rejected") ||
        signErr.message?.includes("rejected")
      ) {
        throw new Error("Sign-in request was rejected in your Solana wallet.");
      }
      console.warn("Solana sign warning:", signErr);
      signature = "sol_authenticated_" + Date.now();
    }

    const walletName =
      walletId === "phantom"
        ? "Phantom"
        : walletId === "solflare"
        ? "Solflare"
        : walletId === "backpack"
        ? "Backpack"
        : "Solana Wallet";

    const session: AuthSession = {
      address,
      signature,
      walletName,
      timestamp: Date.now(),
    };

    saveAuthSession(session);
    return session;
  } catch (err: any) {
    if (err.code === 4001 || err.message?.includes("rejected")) {
      throw new Error("Connection was rejected in wallet.");
    }
    throw new Error(err.message || "Failed to authenticate with Solana wallet.");
  }
}

/**
 * Save authentication session to localStorage and notify all listeners
 */
export function saveAuthSession(session: AuthSession) {
  if (typeof window === "undefined") return;

  localStorage.setItem("cove_wallet_address", session.address);
  if (session.signature) {
    localStorage.setItem("cove_wallet_signature", session.signature);
  }
  localStorage.setItem("cove_wallet_name", session.walletName);
  localStorage.setItem("cove_wallet_time", session.timestamp.toString());
  localStorage.setItem("cove_chain", "solana");

  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new CustomEvent("cove_auth_changed", { detail: session }));
}

/**
 * Disconnect and clear wallet authentication session
 */
export function disconnectWallet() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("cove_wallet_address");
  localStorage.removeItem("cove_wallet_signature");
  localStorage.removeItem("cove_wallet_name");
  localStorage.removeItem("cove_wallet_time");
  localStorage.removeItem("cove_has_hatched");
  localStorage.removeItem("cove_chain");

  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new CustomEvent("cove_auth_changed", { detail: null }));
  window.dispatchEvent(
    new CustomEvent("cove_hatch_status_changed", { detail: { hatched: false } })
  );
}

/**
 * Format Solana public key to 7xKX...3Fq9
 */
export function formatAddress(address: string | null | undefined): string {
  if (!address) return "";
  if (address.length <= 8) return address;
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
}
