import React from 'react';
import { WalletProvider } from './components/wallet/WalletContext';
import Sidebar from './components/navigation/Sidebar';
import TopBar from './components/navigation/TopBar';
import WalletAdapterStyles from './components/wallet/WalletAdapterStyles';

export default function Layout({ children, currentPageName }) {
  return (
    <WalletProvider>
      <WalletAdapterStyles />
            <div className="min-h-screen bg-[#0A0A10] text-white relative overflow-hidden">
              {/* Space Background */}
              <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0520] to-[#0A0A10]" />
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
                  <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                  <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-[90px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
                  <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
                </div>
                {/* Starfield */}
                <div className="absolute inset-0 opacity-60" style={{
                  backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                                    radial-gradient(2px 2px at 60% 70%, white, transparent),
                                    radial-gradient(1px 1px at 50% 50%, white, transparent),
                                    radial-gradient(1px 1px at 80% 10%, white, transparent),
                                    radial-gradient(2px 2px at 90% 60%, white, transparent),
                                    radial-gradient(1px 1px at 33% 85%, white, transparent),
                                    radial-gradient(1px 1px at 15% 70%, white, transparent)`,
                  backgroundSize: '200% 200%',
                  backgroundPosition: '50% 50%'
                }} />
                {/* Black translucent overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
              </div>

              <div className="relative z-10">
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
        </div>
    </WalletProvider>
  );
}