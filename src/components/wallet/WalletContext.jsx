import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider, useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

const WalletContext = createContext(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

const WalletContextProvider = ({ children }) => {
  const solanaWallet = useSolanaWallet();
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState('mainnet-beta');
  const [walletType, setWalletType] = useState(null);

  // Fetch balance when wallet connects
  useEffect(() => {
    if (solanaWallet.publicKey) {
      fetchBalance();
      
      // Detect wallet type
      if (solanaWallet.wallet?.adapter?.name) {
        setWalletType(solanaWallet.wallet.adapter.name.toLowerCase());
      }
    } else {
      setBalance(0);
      setWalletType(null);
    }
  }, [solanaWallet.publicKey, network]);

  const fetchBalance = async () => {
    try {
      if (!solanaWallet.publicKey) return;
      
      const endpoint = network === 'mainnet-beta' 
        ? clusterApiUrl('mainnet-beta')
        : network === 'devnet'
        ? clusterApiUrl('devnet')
        : clusterApiUrl('testnet');

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [solanaWallet.publicKey.toBase58()]
        })
      });

      const data = await response.json();
      if (data.result?.value !== undefined) {
        const solBalance = data.result.value / 1e9;
        setBalance(Number(solBalance.toFixed(4))); // Convert lamports to SOL with precision
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connect = async (type) => {
    try {
      await solanaWallet.connect();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = async () => {
    try {
      await solanaWallet.disconnect();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const switchNetwork = (net) => {
    setNetwork(net);
  };

  return (
    <WalletContext.Provider value={{
      connected: solanaWallet.connected,
      walletType,
      publicKey: solanaWallet.publicKey ? `${solanaWallet.publicKey.toBase58().slice(0, 4)}...${solanaWallet.publicKey.toBase58().slice(-4)}` : null,
      publicKeyFull: solanaWallet.publicKey?.toBase58(),
      balance,
      network,
      connect,
      disconnect,
      switchNetwork,
      signTransaction: solanaWallet.signTransaction,
      signMessage: solanaWallet.signMessage,
      wallet: solanaWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const WalletProvider = ({ children }) => {
  const [network, setNetwork] = useState('mainnet-beta');
  
  const endpoint = useMemo(() => {
    switch (network) {
      case 'devnet':
        return clusterApiUrl('devnet');
      case 'testnet':
        return clusterApiUrl('testnet');
      default:
        return clusterApiUrl('mainnet-beta');
    }
  }, [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProvider;