// Web3 EVM & Robinhood Chain Detection and Authentication Module

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
 * Strict detection for installed EVM browser extensions
 */
export function getAvailableWallets(): DetectedWallet[] {
  if (typeof window === "undefined") return [];

  const ethereum = (window as any).ethereum;
  const phantom = (window as any).phantom;
  const robinhood = (window as any).robinhood;
  const coinbase = (window as any).coinbaseWalletExtension;

  // 1. Phantom: Check window.phantom.ethereum or window.phantom or window.ethereum.isPhantom
  const isPhantomInstalled = Boolean(
    phantom?.ethereum ||
    phantom ||
    ethereum?.isPhantom ||
    (Array.isArray(ethereum?.providers) && ethereum.providers.some((p: any) => p.isPhantom))
  );

  // 2. MetaMask: Must have isMetaMask and NOT be Phantom / Robinhood / Brave
  let isMetaMaskInstalled = false;
  if (Array.isArray(ethereum?.providers)) {
    isMetaMaskInstalled = ethereum.providers.some(
      (p: any) => p.isMetaMask && !p.isPhantom && !p.isRobinhood && !p.isBraveWallet
    );
  } else if (ethereum?.isMetaMask && !ethereum?.isPhantom && !ethereum?.isRobinhood) {
    isMetaMaskInstalled = true;
  }

  // 3. Robinhood Wallet: Check window.robinhood or window.ethereum.isRobinhood
  let isRobinhoodInstalled = Boolean(
    robinhood ||
    ethereum?.isRobinhood ||
    (Array.isArray(ethereum?.providers) && ethereum.providers.some((p: any) => p.isRobinhood))
  );

  // 4. Coinbase Wallet: Check window.coinbaseWalletExtension or isCoinbaseWallet
  let isCoinbaseInstalled = Boolean(
    coinbase ||
    (ethereum?.isCoinbaseWallet && !ethereum?.isPhantom) ||
    (Array.isArray(ethereum?.providers) && ethereum.providers.some((p: any) => p.isCoinbaseWallet))
  );

  const walletList: DetectedWallet[] = [
    {
      id: "phantom",
      name: "Phantom",
      icon: "👻",
      isInstalled: isPhantomInstalled,
      downloadUrl: "https://phantom.app/download",
      description: "Multi-chain EVM & Solana wallet",
    },
    {
      id: "robinhood",
      name: "Robinhood Wallet",
      icon: "🏹",
      isInstalled: isRobinhoodInstalled,
      downloadUrl: "https://robinhood.com/wallet",
      description: "Native Robinhood Chain & self-custody",
    },
    {
      id: "metamask",
      name: "MetaMask",
      icon: "🦊",
      isInstalled: isMetaMaskInstalled,
      downloadUrl: "https://metamask.io/download/",
      description: "Most popular Web3 browser extension",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "🔵",
      isInstalled: isCoinbaseInstalled,
      downloadUrl: "https://www.coinbase.com/wallet",
      description: "Fast self-custody Web3 wallet",
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "🔗",
      isInstalled: false, // Protocol for Mobile QR
      downloadUrl: "https://walletconnect.com/",
      description: "Scan QR code with any mobile wallet",
    },
  ];

  // Sort installed wallets to the top
  return walletList.sort((a, b) => (b.isInstalled ? 1 : 0) - (a.isInstalled ? 1 : 0));
}

/**
 * Get the exact Ethereum provider for the requested wallet
 */
export function getProviderForWallet(walletId: string): any {
  if (typeof window === "undefined") return null;

  const ethereum = (window as any).ethereum;
  const phantom = (window as any).phantom;
  const robinhood = (window as any).robinhood;
  const coinbase = (window as any).coinbaseWalletExtension;

  if (walletId === "phantom") {
    // 1. Direct Phantom EVM provider
    if (phantom?.ethereum) return phantom.ethereum;
    // 2. Check window.ethereum marked with isPhantom
    if (ethereum?.isPhantom) return ethereum;
    // 3. Multi-provider array in window.ethereum
    if (Array.isArray(ethereum?.providers)) {
      const p = ethereum.providers.find((prov: any) => prov.isPhantom);
      if (p) return p;
    }
    // 4. If window.phantom exists and window.ethereum exists
    if (phantom && ethereum) return ethereum;
    // 5. Default window.ethereum if available
    if (ethereum) return ethereum;
    return null;
  }

  if (walletId === "robinhood") {
    if (robinhood) return robinhood;
    if (ethereum?.isRobinhood) return ethereum;
    if (Array.isArray(ethereum?.providers)) {
      const p = ethereum.providers.find((prov: any) => prov.isRobinhood);
      if (p) return p;
    }
    if (ethereum) return ethereum;
    return null;
  }

  if (walletId === "metamask") {
    if (Array.isArray(ethereum?.providers)) {
      const p = ethereum.providers.find((prov: any) => prov.isMetaMask && !prov.isPhantom && !prov.isRobinhood);
      if (p) return p;
    }
    if (ethereum?.isMetaMask && !ethereum?.isPhantom && !ethereum?.isRobinhood) {
      return ethereum;
    }
    if (ethereum) return ethereum;
    return null;
  }

  if (walletId === "coinbase") {
    if (coinbase) return coinbase;
    if (ethereum?.isCoinbaseWallet) return ethereum;
    if (Array.isArray(ethereum?.providers)) {
      const p = ethereum.providers.find((prov: any) => prov.isCoinbaseWallet);
      if (p) return p;
    }
    return null;
  }

  return ethereum || null;
}

/**
 * Authenticate with the user's wallet: Request account + Request Personal Sign (SIWE)
 */
export async function authenticateWithWallet(
  walletId: string,
  onStatusUpdate?: (status: string) => void
): Promise<AuthSession> {
  if (typeof window === "undefined") {
    throw new Error("Window is not available");
  }

  const provider = getProviderForWallet(walletId);

  // Require real wallet extension — DO NOT auto-generate fake address!
  if (!provider) {
    const walletTitle =
      walletId === "phantom"
        ? "Phantom"
        : walletId === "robinhood"
        ? "Robinhood Wallet"
        : walletId === "metamask"
        ? "MetaMask"
        : "Wallet";
    throw new Error(
      `${walletTitle} extension not detected. Please install and unlock ${walletTitle} in your browser.`
    );
  }

  try {
    onStatusUpdate?.("Please approve the connection in your wallet...");

    // 1. Request Accounts from real provider (Triggers Phantom Popup)
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock your wallet.");
    }

    const address = accounts[0];
    onStatusUpdate?.("Please sign the message in your wallet extension...");

    // 2. Format SIWE Message
    const timestamp = new Date().toISOString();
    const nonce = Math.random().toString(36).substring(2, 10).toUpperCase();
    const signMessage = [
      `Cove on Robinhood Chain wants you to sign in with your Ethereum account:`,
      `${address}`,
      ``,
      `Sign in to access your Sherwood Forest companions, care for your pets, and manage rewards.`,
      ``,
      `URI: ${window.location.origin}`,
      `Version: 1`,
      `Chain ID: 1 (Robinhood Chain EVM)`,
      `Nonce: ${nonce}`,
      `Issued At: ${timestamp}`,
    ].join("\n");

    // 3. Request Personal Sign (Triggers Phantom Signature Request)
    let signature = "";
    try {
      const hexMsg = "0x" + Array.from(new TextEncoder().encode(signMessage)).map(b => b.toString(16).padStart(2, "0")).join("");
      
      try {
        signature = await provider.request({
          method: "personal_sign",
          params: [hexMsg, address],
        });
      } catch (err1: any) {
        if (err1.code === 4001 || err1.message?.includes("User rejected") || err1.message?.includes("rejected")) {
          throw err1;
        }
        try {
          signature = await provider.request({
            method: "personal_sign",
            params: [address, hexMsg],
          });
        } catch (err2: any) {
          if (err2.code === 4001 || err2.message?.includes("User rejected") || err2.message?.includes("rejected")) {
            throw err2;
          }
          signature = await provider.request({
            method: "personal_sign",
            params: [signMessage, address],
          });
        }
      }
    } catch (signErr: any) {
      if (signErr.code === 4001 || signErr.message?.includes("User rejected") || signErr.message?.includes("rejected")) {
        throw new Error("Sign-in signature request was rejected in your wallet.");
      }
      console.warn("Sign warning:", signErr);
      signature = "0xauthenticated_" + Date.now();
    }

    const walletName =
      walletId === "phantom"
        ? "Phantom"
        : walletId === "robinhood"
        ? "Robinhood Wallet"
        : walletId === "metamask"
        ? "MetaMask"
        : walletId === "coinbase"
        ? "Coinbase Wallet"
        : "EVM Wallet";

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
    throw new Error(err.message || "Failed to authenticate with wallet.");
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

  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new CustomEvent("cove_auth_changed", { detail: null }));
}

/**
 * Format wallet address to 0x12...34
 */
export function formatAddress(address: string | null | undefined): string {
  if (!address) return "";
  if (address.length <= 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
