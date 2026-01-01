import React from 'react';

export default function WalletAdapterStyles() {
  return (
    <style jsx global>{`
      .wallet-adapter-dropdown {
        background: #1A1A2E !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 12px !important;
      }
      
      .wallet-adapter-dropdown-list {
        background: #1A1A2E !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 12px !important;
      }
      
      .wallet-adapter-dropdown-list-item {
        background: transparent !important;
        color: white !important;
      }
      
      .wallet-adapter-dropdown-list-item:hover {
        background: rgba(255, 255, 255, 0.05) !important;
      }
      
      .wallet-adapter-button {
        background: linear-gradient(to right, #9945FF, #14F195) !important;
        color: white !important;
        border-radius: 12px !important;
        font-weight: 600 !important;
        padding: 0 24px !important;
        height: 44px !important;
      }
      
      .wallet-adapter-button:hover {
        opacity: 0.9 !important;
      }
      
      .wallet-adapter-modal-wrapper {
        background: rgba(10, 10, 16, 0.95) !important;
        backdrop-filter: blur(10px) !important;
      }
      
      .wallet-adapter-modal {
        background: #1A1A2E !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 16px !important;
      }
      
      .wallet-adapter-modal-title {
        color: white !important;
      }
      
      .wallet-adapter-modal-list {
        background: transparent !important;
      }
      
      .wallet-adapter-modal-list-item {
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
        border-radius: 12px !important;
        margin-bottom: 12px !important;
      }
      
      .wallet-adapter-modal-list-item:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(153, 69, 255, 0.5) !important;
      }
      
      .wallet-adapter-button-trigger {
        background: linear-gradient(to right, #9945FF, #14F195) !important;
      }
    `}</style>
  );
}