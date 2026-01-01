import React, { createContext, useContext, useState, useCallback } from 'react';

const WalletContext = createContext(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState('mainnet-beta');

  const connect = useCallback(async (type) => {
    // Simulated wallet connection
    setWalletType(type);
    setPublicKey('7xKX...demo');
    setBalance(12.5847);
    setConnected(true);
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setWalletType(null);
    setPublicKey(null);
    setBalance(0);
  }, []);

  const switchNetwork = useCallback((net) => {
    setNetwork(net);
  }, []);

  return (
    <WalletContext.Provider value={{
      connected,
      walletType,
      publicKey,
      balance,
      network,
      connect,
      disconnect,
      switchNetwork
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;