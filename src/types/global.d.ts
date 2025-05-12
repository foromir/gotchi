interface EthereumRequestArguments {
  method: string;
  params?: unknown[];
}

export interface EthereumProvider {
  request: (args: EthereumRequestArguments) => Promise<unknown>;
  on: (eventName: string, handler: (...args: unknown[]) => void) => void;
  removeAllListeners: (eventName: string) => void;
  isMetaMask?: boolean;
  selectedAddress?: string | null;
  networkVersion?: string;
  chainId?: string;
  autoRefreshOnNetworkChange?: boolean;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {}; 