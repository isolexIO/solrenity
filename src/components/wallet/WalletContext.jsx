import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider, useWallet as useSolanaWallet, useConnection } from '@solana/wallet-adapter-react';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter, 
  TorusWalletAdapter, 
  LedgerWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

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
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState('mainnet-beta');
  const [walletType, setWalletType] = useState(null);

  // Fetch balance when wallet connects
  useEffect(() => {
    if (solanaWallet.publicKey && connection) {
      fetchBalance();
      
      // Detect wallet type
      if (solanaWallet.wallet?.adapter?.name) {
        setWalletType(solanaWallet.wallet.adapter.name.toLowerCase());
      }
      
      // Set up balance polling every 10 seconds
      const interval = setInterval(() => {
        fetchBalance();
      }, 10000);
      
      return () => clearInterval(interval);
    } else {
      setBalance(0);
      setWalletType(null);
    }
  }, [solanaWallet.publicKey, connection, network]);

  const fetchBalance = async () => {
    try {
      if (!solanaWallet.publicKey || !connection) {
        return;
      }

      const lamports = await connection.getBalance(solanaWallet.publicKey, 'confirmed');
      const solBalance = lamports / LAMPORTS_PER_SOL;
      setBalance(Number(solBalance.toFixed(4)));
    } catch (error) {
      console.error('Error fetching balance:', error);
      // Don't reset balance on error, keep previous value
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

  const contextValue = {
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
    wallet: solanaWallet,
    refetchBalance: fetchBalance
  };

  console.log('WalletContext value:', { connected: contextValue.connected, balance: contextValue.balance, publicKey: contextValue.publicKey });

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const WalletProvider = ({ children }) => {
  const [network, setNetwork] = useState('mainnet-beta');
  
  const endpoint = useMemo(() => {
    switch (network) {
      case 'devnet':
        return 'https://api.devnet.solana.com';
      case 'testnet':
        return 'https://api.testnet.solana.com';
      default:
        return 'https://mainnet.helius-rpc.com/?api-key=bbee7042-85f5-4b2c-85bf-972f09aad483';
    }
  }, [network]);

  const connectionConfig = useMemo(() => ({
    commitment: 'confirmed',
    disableRetryOnRateLimit: true,
    confirmTransactionInitialTimeout: 60000
  }), []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter()
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint} config={connectionConfig}>
      <SolanaWalletProvider wallets={wallets} autoConnect={false}>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProvider;