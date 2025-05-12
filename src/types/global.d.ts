interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (eventName: string, handler: (...args: any[]) => void) => void;
    removeAllListeners: (eventName: string) => void;
    isMetaMask?: boolean;
    selectedAddress?: string | null;
    networkVersion?: string;
    chainId?: string;
    autoRefreshOnNetworkChange?: boolean;
  };
} 