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
                
                {/* Solana Sun - Central Star */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative w-32 h-32">
                    {/* Sun glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] via-[#14F195] to-[#9945FF] rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-2 bg-gradient-to-br from-[#9945FF] via-[#14F195] to-[#9945FF] rounded-full blur-xl opacity-80 animate-pulse" style={{ animationDuration: '2s' }} />
                    {/* Solana Logo */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <img 
                        src="https://cryptologos.cc/logos/solana-sol-logo.svg" 
                        alt="Solana"
                        className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
                        style={{ animationDuration: '4s' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Orbit paths */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Orbit 1 */}
                  <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 40s linear infinite' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-lg shadow-cyan-500/50" />
                  </div>
                  
                  {/* Orbit 2 */}
                  <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 60s linear infinite reverse' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg shadow-purple-500/50" />
                      {/* Moon orbiting this planet */}
                      <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 8s linear infinite' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full shadow-sm" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Orbit 3 */}
                  <div className="absolute w-[800px] h-[800px] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 80s linear infinite' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-lg shadow-green-500/50" />
                  </div>
                  
                  {/* Orbit 4 */}
                  <div className="absolute w-[1000px] h-[1000px] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 100s linear infinite reverse' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-lg shadow-orange-500/50" />
                      {/* Two moons */}
                      <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 10s linear infinite' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-300 rounded-full shadow-sm" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 6s linear infinite reverse' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-500 rounded-full shadow-sm" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Orbit 5 - Distant */}
                  <div className="absolute w-[1200px] h-[1200px] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 120s linear infinite' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-full shadow-lg shadow-indigo-500/50" />
                  </div>
                </div>
                
                {/* Black translucent overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
              </div>

              <div className="relative z-10">
              <style>{`
                @keyframes spin {
                  from { transform: translate(-50%, -50%) rotate(0deg); }
                  to { transform: translate(-50%, -50%) rotate(360deg); }
                }

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
        
        {currentPageName !== 'Home' && <Sidebar currentPage={currentPageName} />}
        {currentPageName !== 'Home' && <TopBar />}

        <main className={`${currentPageName !== 'Home' ? 'ml-0 sm:ml-20 lg:ml-64 pt-16' : ''} min-h-screen`}>
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
        </div>
        </div>
    </WalletProvider>
  );
}