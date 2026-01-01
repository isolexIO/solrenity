import React from 'react';
import { WalletProvider } from './components/wallet/WalletContext';
import Sidebar from './components/navigation/Sidebar';
import TopBar from './components/navigation/TopBar';

export default function Layout({ children, currentPageName }) {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-[#0A0A10] text-white">
        <style>{`
          :root {
            --background: 222 47% 4%;
            --foreground: 0 0% 100%;
            --card: 222 47% 8%;
            --card-foreground: 0 0% 100%;
            --popover: 222 47% 8%;
            --popover-foreground: 0 0% 100%;
            --primary: 262 83% 58%;
            --primary-foreground: 0 0% 100%;
            --secondary: 160 84% 51%;
            --secondary-foreground: 0 0% 0%;
            --muted: 222 47% 12%;
            --muted-foreground: 0 0% 60%;
            --accent: 262 83% 58%;
            --accent-foreground: 0 0% 100%;
            --destructive: 0 84% 60%;
            --destructive-foreground: 0 0% 100%;
            --border: 0 0% 100% / 0.1;
            --input: 0 0% 100% / 0.1;
            --ring: 262 83% 58%;
          }
          
          body {
            background-color: #0A0A10;
          }
          
          ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(153, 69, 255, 0.5);
            border-radius: 3px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(153, 69, 255, 0.7);
          }
        `}</style>
        
        <Sidebar currentPage={currentPageName} />
        <TopBar />
        
        <main className="ml-20 lg:ml-64 pt-16 min-h-screen">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </WalletProvider>
  );
}