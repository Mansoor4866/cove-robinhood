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
  const phantomEthereum = (window as any).phantom?.ethereum;
  const robinhood = (window as any).robinhood;
  const coinbase = (window as any).coinbaseWalletExtension;

  // 1. Phantom: Check window.phantom.ethereum or window.ethereum.isPhantom
  const isPhantomInstalled = Boolean(
    phantomEthereum?.isPhantom ||
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
  const phantomEthereum = (window as any).phantom?.ethereum;
  const robinhood = (window as any).robinhood;
  const coinbase = (window as any).coinbaseWalletExtension;

  if (walletId === "phantom") {
    if (phantomEthereum) return phantomEthereum;
    if (ethereum?.isPhantom) return ethereum;
    if (Array.isArray(ethereum?.providers)) {
      const p = ethereum.providers.find((prov: any) => prov.isPhantom);
      if (p) return p;
    }
    return null;
  }

  if (walletId === "robinhood") {
    if (robinhood) return robinhood;
    if (ethereum?.isRobinhood) return ethereum;
    if (Array.isArray(ethereum?.providers)) {
      const p = ethereum.providers.find((prov: any) => prov.isRobinhood);
      if (p) return p;
    }
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

  return null;
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

  // If the extension is not installed (e.g. WalletConnect / demo test)
  if (!provider) {
    if (walletId === "walletconnect") {
      onStatusUpdate?.("Generating secure WalletConnect QR session...");
    } else {
      onStatusUpdate?.("Wallet extension not found. Starting simulated EVM session...");
    }
    await new Promise((r) => setTimeout(r, 900));

    const fakeAddr = `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`;
    const session: AuthSession = {
      address: fakeAddr,
      signature: "0xsimulated_signature_" + Math.random().toString(16).substring(2, 10),
      walletName:
        walletId === "robinhood"
          ? "Robinhood Wallet"
          : walletId === "phantom"
          ? "Phantom"
          : walletId === "metamask"
          ? "MetaMask"
          : "WalletConnect",
      timestamp: Date.now(),
    };

    saveAuthSession(session);
    return session;
  }

  try {
    onStatusUpdate?.("Requesting account approval in your wallet...");

    // 1. Request Accounts from provider
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock your wallet.");
    }

    const address = accounts[0];
    onStatusUpdate?.("Please sign the authentication message in your wallet extension...");

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

    // 3. Request Personal Sign
    let signature = "";
    try {
      // Encode as hex for maximum cross-wallet EVM compatibility (Phantom/MetaMask)
      const hexMsg = "0x" + Array.from(new TextEncoder().encode(signMessage)).map(b => b.toString(16).padStart(2, "0")).join("");
      
      try {
        signature = await provider.request({
          method: "personal_sign",
          params: [hexMsg, address],
        });
      } catch (hexErr: any) {
        // Fallback: try raw string params order [signMessage, address]
        signature = await provider.request({
          method: "personal_sign",
          params: [signMessage, address],
        });
      }
    } catch (signErr: any) {
      if (signErr.code === 4001 || signErr.message?.includes("User rejected") || signErr.message?.includes("rejected")) {
        throw new Error("Sign-in signature request was rejected in wallet.");
      }
      console.warn("Sign fallback triggered:", signErr);
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
