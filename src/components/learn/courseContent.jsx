export const courseContent = {
  basics: {
    lessons: [
      {
        title: 'What is Solana?',
        duration: '8 min',
        content: [
          { type: 'paragraph', text: 'Solana is a high-performance blockchain designed for decentralized applications and crypto projects. It stands out for its exceptional speed and low transaction costs.' },
          { type: 'heading', text: 'Key Features' },
          { type: 'list', items: [
            'Lightning-fast transactions: Up to 65,000 transactions per second',
            'Low fees: Average transaction cost less than $0.01',
            'Proof of History (PoH): Innovative consensus mechanism for timestamping',
            'Energy efficient: Uses significantly less energy than traditional blockchains'
          ]},
          { type: 'highlight', text: '💡 Solana processes transactions in under 400 milliseconds, making it one of the fastest blockchains in existence.' },
          { type: 'heading', text: 'Why Solana?' },
          { type: 'paragraph', text: 'Solana was created to solve the blockchain trilemma of achieving decentralization, security, and scalability simultaneously. Its unique architecture enables developers to build complex applications without compromising on speed or cost.' },
        ]
      },
      {
        title: 'Understanding Wallets',
        duration: '10 min',
        content: [
          { type: 'paragraph', text: 'A Solana wallet is your gateway to the blockchain. It stores your private keys and allows you to interact with decentralized applications, send and receive tokens, and manage your digital assets.' },
          { type: 'heading', text: 'Types of Wallets' },
          { type: 'list', items: [
            'Browser Extensions: Phantom, Solflare - easy to use for dApps',
            'Mobile Wallets: Phantom Mobile, Solflare Mobile - access on the go',
            'Hardware Wallets: Ledger - maximum security for large holdings',
            'Web Wallets: Sollet - quick access from any browser'
          ]},
          { type: 'highlight', text: '🔐 Never share your seed phrase with anyone. Your seed phrase is the master key to your wallet.' },
          { type: 'heading', text: 'Setting Up Your First Wallet' },
          { type: 'paragraph', text: 'When you create a wallet, you receive a 12 or 24-word seed phrase. This phrase is used to recover your wallet if you lose access. Write it down on paper and store it in a secure location - never digitally!' },
        ]
      },
      {
        title: 'Your First Transaction',
        duration: '7 min',
        content: [
          { type: 'paragraph', text: 'Making your first transaction on Solana is simple and fast. Let\'s walk through the process of sending SOL tokens to another wallet.' },
          { type: 'heading', text: 'Steps to Send SOL' },
          { type: 'list', items: [
            'Open your Solana wallet (e.g., Phantom)',
            'Click "Send" or the send icon',
            'Enter the recipient\'s wallet address',
            'Input the amount of SOL you want to send',
            'Review the transaction details and fees',
            'Confirm and sign the transaction'
          ]},
          { type: 'highlight', text: '⚡ Transactions on Solana typically confirm in less than 1 second!' },
          { type: 'heading', text: 'Transaction Signatures' },
          { type: 'paragraph', text: 'Every transaction has a unique signature that serves as proof of the transaction. You can view this on Solana explorers like Solscan or Solana Explorer to verify your transaction was successful.' },
        ]
      },
      {
        title: 'Network Fees Explained',
        duration: '5 min',
        content: [
          { type: 'paragraph', text: 'Transaction fees on Solana are incredibly low compared to other blockchains. Understanding how fees work helps you manage your assets efficiently.' },
          { type: 'heading', text: 'Fee Structure' },
          { type: 'paragraph', text: 'Solana uses a base fee of 0.000005 SOL per signature (roughly $0.0001). Additional fees may apply for priority or complex transactions involving multiple accounts.' },
          { type: 'list', items: [
            'Base fee: 0.000005 SOL per signature',
            'Priority fees: Optional, helps transactions process faster during congestion',
            'Rent: Small deposit required for account storage (refundable when closed)',
            'No gas wars: Fees remain stable even during high network activity'
          ]},
          { type: 'highlight', text: '💰 Unlike Ethereum where fees can spike to hundreds of dollars, Solana fees remain consistently under a penny.' },
        ]
      }
    ]
  },
  tokens: {
    lessons: [
      {
        title: 'Native SOL Token',
        duration: '8 min',
        content: [
          { type: 'paragraph', text: 'SOL is the native cryptocurrency of the Solana blockchain. It serves multiple purposes within the ecosystem and is essential for network operations.' },
          { type: 'heading', text: 'Uses of SOL' },
          { type: 'list', items: [
            'Transaction Fees: Pay for operations on the network',
            'Staking: Secure the network and earn rewards',
            'Governance: Participate in protocol decisions',
            'Medium of Exchange: Trade for other tokens and services'
          ]},
          { type: 'highlight', text: '🪙 SOL has a max supply of approximately 580 million tokens, with inflation decreasing over time.' },
          { type: 'paragraph', text: 'The smallest unit of SOL is called a "lamport" (1 SOL = 1,000,000,000 lamports), named after Leslie Lamport, a computer scientist whose work influenced Solana\'s design.' },
        ]
      },
      {
        title: 'SPL Token Standard',
        duration: '12 min',
        content: [
          { type: 'paragraph', text: 'The Solana Program Library (SPL) Token Standard is the framework for creating and managing tokens on Solana, similar to ERC-20 on Ethereum.' },
          { type: 'heading', text: 'What are SPL Tokens?' },
          { type: 'paragraph', text: 'SPL tokens are any cryptocurrency or digital asset built on Solana using the SPL token standard. This includes stablecoins like USDC, governance tokens, and thousands of other assets.' },
          { type: 'list', items: [
            'Fungible Tokens: Interchangeable tokens like USDC, RAY, or SRM',
            'Non-Fungible Tokens: Unique tokens representing NFTs',
            'Wrapped Tokens: Representations of assets from other chains',
            'Governance Tokens: Used for voting on protocol decisions'
          ]},
          { type: 'highlight', text: '🔧 Creating an SPL token requires about 0.002 SOL in rent, which is refundable when the token is closed.' },
        ]
      },
      {
        title: 'Token Accounts',
        duration: '10 min',
        content: [
          { type: 'paragraph', text: 'Unlike Ethereum where your wallet directly holds all tokens, Solana uses Associated Token Accounts (ATAs) to manage SPL tokens. Each token type requires its own account.' },
          { type: 'heading', text: 'How Token Accounts Work' },
          { type: 'paragraph', text: 'When you receive a new type of SPL token for the first time, an Associated Token Account is automatically created for you. This account stores only that specific token type.' },
          { type: 'list', items: [
            'One account per token type per wallet',
            'Automatically created when receiving new tokens',
            'Requires small rent deposit (~0.002 SOL)',
            'Can be closed to recover rent when balance is zero'
          ]},
          { type: 'highlight', text: '💡 Your wallet manages all these token accounts behind the scenes, so you don\'t need to worry about them in daily use.' },
        ]
      },
      {
        title: 'Sending & Receiving Tokens',
        duration: '15 min',
        content: [
          { type: 'paragraph', text: 'Transferring SPL tokens is as simple as sending SOL, but there are a few important considerations to keep in mind for a smooth experience.' },
          { type: 'heading', text: 'Receiving Tokens' },
          { type: 'paragraph', text: 'To receive tokens, simply share your wallet address. The sender pays for creating your token account if you don\'t already have one for that token type.' },
          { type: 'heading', text: 'Sending Tokens' },
          { type: 'list', items: [
            'Ensure you have enough SOL for transaction fees',
            'Double-check the recipient address (transactions are irreversible)',
            'Verify the token type you\'re sending',
            'Some wallets support QR codes for easier transfers'
          ]},
          { type: 'highlight', text: '⚠️ Always send a small test transaction first when dealing with large amounts or new addresses.' },
          { type: 'heading', text: 'Token Allowances' },
          { type: 'paragraph', text: 'Unlike some blockchains, Solana handles token approvals differently. You maintain full control and must explicitly sign each transaction. No pre-approvals means better security.' },
        ]
      }
    ]
  },
  defi: {
    lessons: [
      {
        title: 'What is DeFi?',
        duration: '12 min',
        content: [
          { type: 'paragraph', text: 'Decentralized Finance (DeFi) represents a paradigm shift in financial services, removing intermediaries and operating entirely on blockchain technology.' },
          { type: 'heading', text: 'Core Principles of DeFi' },
          { type: 'list', items: [
            'Permissionless: Anyone can access without approval',
            'Transparent: All transactions visible on blockchain',
            'Composable: Different protocols work together seamlessly',
            'Non-custodial: You control your assets at all times'
          ]},
          { type: 'highlight', text: '🌐 DeFi on Solana processes transactions in under a second, making it feel like traditional finance while maintaining decentralization.' },
          { type: 'heading', text: 'Benefits of Solana DeFi' },
          { type: 'paragraph', text: 'Solana\'s high speed and low costs make DeFi practical for everyday use. Trading, lending, and yield farming are accessible to everyone without prohibitive fees.' },
        ]
      },
      {
        title: 'Decentralized Exchanges',
        duration: '15 min',
        content: [
          { type: 'paragraph', text: 'Decentralized Exchanges (DEXs) allow you to trade cryptocurrencies directly from your wallet without intermediaries. On Solana, popular DEXs include Jupiter, Raydium, and Orca.' },
          { type: 'heading', text: 'How DEXs Work' },
          { type: 'paragraph', text: 'DEXs use smart contracts to facilitate trades. Instead of an order book matching buyers and sellers, most Solana DEXs use Automated Market Makers (AMMs) with liquidity pools.' },
          { type: 'list', items: [
            'Connect your wallet directly to the DEX',
            'Select tokens to swap and enter amount',
            'Review exchange rate and fees',
            'Approve and sign the transaction',
            'Tokens arrive in your wallet instantly'
          ]},
          { type: 'highlight', text: '⚡ Jupiter aggregates liquidity across multiple DEXs to find you the best price for your trade.' },
          { type: 'heading', text: 'Advantages over Centralized Exchanges' },
          { type: 'list', items: [
            'No KYC requirements',
            'No withdrawal limits',
            'Direct wallet control',
            'Access to newest tokens immediately',
            'Lower fees on Solana'
          ]},
        ]
      },
      {
        title: 'Liquidity Pools & AMMs',
        duration: '18 min',
        content: [
          { type: 'paragraph', text: 'Automated Market Makers (AMMs) revolutionized DeFi trading. Instead of traditional order books, AMMs use liquidity pools and mathematical formulas to determine prices.' },
          { type: 'heading', text: 'What is a Liquidity Pool?' },
          { type: 'paragraph', text: 'A liquidity pool is a collection of tokens locked in a smart contract. Traders swap against these pools, and liquidity providers earn fees for supplying tokens.' },
          { type: 'list', items: [
            'Pools contain pairs of tokens (e.g., SOL/USDC)',
            'Prices determined by ratio of tokens in pool',
            'Anyone can become a liquidity provider',
            'Earn trading fees proportional to your contribution'
          ]},
          { type: 'highlight', text: '💰 Typical liquidity provider fees on Solana DEXs range from 0.25% to 1% per trade.' },
          { type: 'heading', text: 'The Constant Product Formula' },
          { type: 'paragraph', text: 'Most AMMs use the formula x * y = k, where x and y are token quantities in the pool, and k is a constant. This ensures that trades always have liquidity, though large trades face more slippage.' },
        ]
      },
      {
        title: 'Lending & Borrowing',
        duration: '15 min',
        content: [
          { type: 'paragraph', text: 'DeFi lending protocols like Solend and Mango Markets allow you to lend your crypto to earn interest or borrow against your holdings without selling.' },
          { type: 'heading', text: 'How Lending Works' },
          { type: 'list', items: [
            'Deposit tokens into a lending pool',
            'Earn interest paid by borrowers',
            'Withdraw anytime (if liquidity available)',
            'Interest rates adjust based on supply and demand'
          ]},
          { type: 'heading', text: 'How Borrowing Works' },
          { type: 'paragraph', text: 'Borrowing requires collateral - you deposit tokens worth more than what you borrow. This over-collateralization protects lenders.' },
          { type: 'list', items: [
            'Deposit collateral (e.g., SOL)',
            'Borrow up to collateral ratio limit (typically 50-80%)',
            'Pay interest on borrowed amount',
            'Repay loan to withdraw collateral'
          ]},
          { type: 'highlight', text: '⚠️ If collateral value drops too low, your position may be liquidated to protect lenders.' },
        ]
      }
    ]
  },
  staking: {
    lessons: [
      {
        title: 'Proof of Stake Basics',
        duration: '10 min',
        content: [
          { type: 'paragraph', text: 'Solana uses Proof of Stake (PoS) to secure its network. Validators stake SOL tokens and process transactions, earning rewards for their service.' },
          { type: 'heading', text: 'How Proof of Stake Works' },
          { type: 'paragraph', text: 'Validators are selected to process transactions based on the amount of SOL they and their delegators stake. More stake means more opportunities to validate transactions and earn rewards.' },
          { type: 'list', items: [
            'Validators run nodes that process transactions',
            'Stake serves as collateral for honest behavior',
            'Bad actors lose stake (slashing)',
            'Delegators share in validator rewards'
          ]},
          { type: 'highlight', text: '🔒 Solana combines PoS with Proof of History for enhanced speed and security.' },
        ]
      },
      {
        title: 'Native vs Liquid Staking',
        duration: '12 min',
        content: [
          { type: 'paragraph', text: 'There are two main ways to stake SOL: native staking and liquid staking. Each has distinct advantages and tradeoffs.' },
          { type: 'heading', text: 'Native Staking' },
          { type: 'list', items: [
            'Stake directly with a validator',
            'Typical APY: 6-8%',
            'Unstaking takes 2-3 days (cool-down period)',
            'Tokens locked while staked',
            'No additional risks beyond validator performance'
          ]},
          { type: 'heading', text: 'Liquid Staking (Marinade, Jito)' },
          { type: 'list', items: [
            'Receive liquid staking tokens (mSOL, jitoSOL)',
            'Use tokens in DeFi while earning staking rewards',
            'Instant unstaking available (at a small cost)',
            'Stake distributed across multiple validators',
            'Additional smart contract risk'
          ]},
          { type: 'highlight', text: '💧 Liquid staking tokens can be used as collateral in lending protocols, allowing you to earn multiple yields.' },
        ]
      },
      {
        title: 'Choosing Validators',
        duration: '8 min',
        content: [
          { type: 'paragraph', text: 'Selecting the right validator is crucial for maximizing rewards and supporting network decentralization.' },
          { type: 'heading', text: 'Key Factors to Consider' },
          { type: 'list', items: [
            'Commission rate: Lower is better, but too low may indicate issues',
            'Uptime: Look for 99%+ (downtime reduces rewards)',
            'Total stake: Smaller validators help decentralization',
            'Reputation: Check community reviews and track record'
          ]},
          { type: 'highlight', text: '🎯 Many stakers choose 2-3 validators to diversify risk while supporting network health.' },
          { type: 'paragraph', text: 'Validators with extremely large stake concentrations can pose centralization risks. Consider supporting smaller, reliable validators to strengthen the network.' },
        ]
      },
      {
        title: 'Earning Staking Rewards',
        duration: '15 min',
        content: [
          { type: 'paragraph', text: 'Staking rewards on Solana are distributed at the end of each epoch (approximately every 2-3 days). Understanding how rewards work helps optimize your strategy.' },
          { type: 'heading', text: 'Reward Calculation' },
          { type: 'paragraph', text: 'Your rewards depend on: validator performance, network inflation rate, validator commission, and your stake amount relative to total stake.' },
          { type: 'list', items: [
            'Rewards auto-compound (added to your stake)',
            'No action needed to claim rewards',
            'Compounding increases over time',
            'Current network APY typically 6-8%'
          ]},
          { type: 'highlight', text: '📈 $1000 staked at 7% APY grows to $1070 after one year with compounding.' },
          { type: 'heading', text: 'Tax Considerations' },
          { type: 'paragraph', text: 'Staking rewards are typically taxable as income when received. Keep records of your rewards for tax reporting. Consult a tax professional for guidance.' },
        ]
      }
    ]
  },
  nfts: {
    lessons: [
      {
        title: 'What are NFTs?',
        duration: '10 min',
        content: [
          { type: 'paragraph', text: 'Non-Fungible Tokens (NFTs) are unique digital assets verified on the blockchain. Unlike cryptocurrencies where each token is identical, every NFT is distinct and cannot be replicated.' },
          { type: 'heading', text: 'NFT Use Cases' },
          { type: 'list', items: [
            'Digital art and collectibles',
            'Gaming items and characters',
            'Virtual real estate and metaverse assets',
            'Event tickets and memberships',
            'Digital identity and credentials',
            'Music and media rights'
          ]},
          { type: 'highlight', text: '🎨 Solana NFTs benefit from near-instant minting and trading at fraction-of-a-penny costs.' },
          { type: 'paragraph', text: 'The blockchain verifies ownership and provenance, ensuring authenticity and enabling true digital ownership. You can prove you own an NFT and transfer it freely.' },
        ]
      },
      {
        title: 'Metaplex Standard',
        duration: '12 min',
        content: [
          { type: 'paragraph', text: 'Metaplex is the dominant NFT standard on Solana, providing tools and protocols for creating, selling, and managing NFTs. Most Solana NFTs follow Metaplex standards.' },
          { type: 'heading', text: 'Key Components' },
          { type: 'list', items: [
            'Token Metadata: Stores NFT name, image, attributes',
            'Candy Machine: Automated NFT minting and distribution',
            'Auction House: Protocol for NFT marketplaces',
            'Certified Collections: Verify NFTs belong to official collections'
          ]},
          { type: 'highlight', text: '🏭 Metaplex Candy Machines have launched some of the most successful NFT projects on Solana.' },
          { type: 'heading', text: 'Metadata Structure' },
          { type: 'paragraph', text: 'NFT metadata typically includes the token name, symbol, image URI, description, and attributes (traits). This data is stored off-chain for efficiency, with a link stored on-chain.' },
        ]
      },
      {
        title: 'Buying & Selling NFTs',
        duration: '15 min',
        content: [
          { type: 'paragraph', text: 'Trading NFTs on Solana is fast and affordable. Popular marketplaces include Magic Eden, Tensor, and OpenSea.' },
          { type: 'heading', text: 'How to Buy NFTs' },
          { type: 'list', items: [
            'Connect your wallet to an NFT marketplace',
            'Browse collections or search for specific NFTs',
            'Check floor price and rarity before buying',
            'Place bid or buy at listed price',
            'Confirm transaction in wallet',
            'NFT appears in your wallet instantly'
          ]},
          { type: 'heading', text: 'How to Sell NFTs' },
          { type: 'list', items: [
            'List your NFT on marketplace',
            'Set listing price or accept bids',
            'Marketplace takes 2-3% fee',
            'Creator royalties typically 5-10%',
            'Funds received immediately upon sale'
          ]},
          { type: 'highlight', text: '💎 Research floor price, trading volume, and collection authenticity before purchasing NFTs.' },
        ]
      },
      {
        title: 'NFT Utilities',
        duration: '8 min',
        content: [
          { type: 'paragraph', text: 'Modern NFTs often provide utility beyond just collectible value. Many projects offer real-world benefits to holders.' },
          { type: 'heading', text: 'Common NFT Utilities' },
          { type: 'list', items: [
            'Access to exclusive communities and Discord servers',
            'Governance rights in DAOs',
            'Airdrops of tokens or additional NFTs',
            'IRL events and conferences',
            'Gaming utilities and in-game benefits',
            'Staking rewards',
            'Commercial usage rights'
          ]},
          { type: 'highlight', text: '🎁 Many successful Solana NFT projects regularly airdrop tokens or free mints to holders.' },
          { type: 'paragraph', text: 'Evaluate NFTs based on the team, roadmap, community, and planned utilities rather than just art. Long-term value often comes from sustained engagement and benefits.' },
        ]
      }
    ]
  },
  security: {
    lessons: [
      {
        title: 'Wallet Security',
        duration: '12 min',
        content: [
          { type: 'paragraph', text: 'Your wallet security is paramount in crypto. Following best practices protects your assets from theft and loss.' },
          { type: 'heading', text: 'Essential Security Practices' },
          { type: 'list', items: [
            'Never share your seed phrase with anyone',
            'Store seed phrase offline (paper, metal backup)',
            'Use hardware wallets for large holdings',
            'Enable all available security features',
            'Use strong, unique passwords',
            'Verify URLs before entering wallet info'
          ]},
          { type: 'highlight', text: '🔐 Your seed phrase is the ONLY way to recover your wallet. Losing it means losing everything.' },
          { type: 'heading', text: 'Multi-Wallet Strategy' },
          { type: 'paragraph', text: 'Consider using multiple wallets: a hot wallet for daily trading, and cold storage for long-term holdings. Never keep all your assets in one place.' },
        ]
      },
      {
        title: 'Common Scams',
        duration: '10 min',
        content: [
          { type: 'paragraph', text: 'Crypto scams are prevalent. Learning to identify them protects your assets and peace of mind.' },
          { type: 'heading', text: 'Types of Scams' },
          { type: 'list', items: [
            'Fake airdrops requiring seed phrase',
            'Phishing websites mimicking real dApps',
            'Social media impersonators offering "support"',
            'Pump and dump schemes',
            'Rug pulls (developers abandon project)',
            'Fake NFT mints',
            'Discord DM scams'
          ]},
          { type: 'highlight', text: '⚠️ No legitimate project will ever ask for your seed phrase or private key.' },
          { type: 'heading', text: 'Red Flags' },
          { type: 'list', items: [
            'Promises of guaranteed returns',
            'Pressure to act immediately',
            'Requests for seed phrase or private keys',
            'Unverified smart contracts',
            'Anonymous team members',
            'Poor grammar in communications'
          ]},
        ]
      },
      {
        title: 'Transaction Approval',
        duration: '8 min',
        content: [
          { type: 'paragraph', text: 'Every transaction requires your approval. Understanding what you\'re signing is crucial for security.' },
          { type: 'heading', text: 'Before Approving Transactions' },
          { type: 'list', items: [
            'Verify the website URL is correct',
            'Check what assets you\'re approving',
            'Understand the transaction purpose',
            'Review all details carefully',
            'Never approve suspicious transactions'
          ]},
          { type: 'highlight', text: '🛡️ If something feels wrong, reject the transaction. Better safe than sorry.' },
          { type: 'heading', text: 'Transaction Simulation' },
          { type: 'paragraph', text: 'Many wallets now simulate transactions before execution, showing you exactly what will happen. Use this feature to verify transfers, swaps, and approvals.' },
        ]
      },
      {
        title: 'Secure Trading',
        duration: '5 min',
        content: [
          { type: 'paragraph', text: 'Safe trading practices reduce risk and protect your assets from malicious actors and costly mistakes.' },
          { type: 'heading', text: 'Trading Best Practices' },
          { type: 'list', items: [
            'Verify token contract addresses',
            'Check liquidity before large trades',
            'Set reasonable slippage tolerance',
            'Use limit orders when possible',
            'Start with small test transactions',
            'Keep some SOL for fees'
          ]},
          { type: 'highlight', text: '✅ Always verify you\'re trading the real token, not a fake with a similar name.' },
          { type: 'paragraph', text: 'Scammers create fake tokens with names similar to popular projects. Always verify the token mint address on official channels before trading.' },
        ]
      }
    ]
  },
  'advanced-defi': {
    lessons: [
      {
        title: 'Yield Farming',
        duration: '18 min',
        content: [
          { type: 'paragraph', text: 'Yield farming involves providing liquidity to DeFi protocols to earn returns. It\'s a way to put your crypto to work generating passive income.' },
          { type: 'heading', text: 'How Yield Farming Works' },
          { type: 'list', items: [
            'Provide liquidity to pools (e.g., SOL-USDC)',
            'Earn trading fees from swaps',
            'Receive additional token rewards',
            'Compound earnings for higher returns',
            'Understand risks before committing funds'
          ]},
          { type: 'highlight', text: '🌾 Annual Percentage Yield (APY) shows expected returns including compounding, while APR doesn\'t.' },
          { type: 'heading', text: 'Strategies' },
          { type: 'paragraph', text: 'Successful yield farming requires active management. Monitor pool performance, gas costs, and token price movements. Diversify across multiple pools to spread risk.' },
          { type: 'list', items: [
            'Start with stablecoin pairs for lower risk',
            'Consider impermanent loss vs. rewards',
            'Regularly harvest and compound rewards',
            'Exit strategies for market downturns'
          ]},
        ]
      },
      {
        title: 'Impermanent Loss',
        duration: '20 min',
        content: [
          { type: 'paragraph', text: 'Impermanent loss occurs when token prices in your liquidity pool diverge from when you deposited. It\'s a critical concept for liquidity providers to understand.' },
          { type: 'heading', text: 'Understanding the Concept' },
          { type: 'paragraph', text: 'When you provide liquidity to a pool like SOL-USDC, your position rebalances as prices change. If SOL price increases significantly, you end up with less SOL and more USDC than if you had simply held.' },
          { type: 'list', items: [
            'Loss is "impermanent" - only realized when withdrawing',
            'Larger price divergence = greater impermanent loss',
            'Trading fees can offset impermanent loss',
            'Stablecoin pairs minimize this risk'
          ]},
          { type: 'highlight', text: '📊 A 2x price change results in ~5.7% impermanent loss, 5x price change results in ~25% loss.' },
          { type: 'heading', text: 'Mitigation Strategies' },
          { type: 'list', items: [
            'Provide liquidity to correlated asset pairs',
            'Focus on high-volume pools with substantial fees',
            'Use stablecoin pairs for low impermanent loss',
            'Consider single-sided staking alternatives'
          ]},
        ]
      },
      {
        title: 'Risk Management',
        duration: '20 min',
        content: [
          { type: 'paragraph', text: 'Effective risk management is essential for long-term DeFi success. Understanding and mitigating risks protects your capital.' },
          { type: 'heading', text: 'Types of DeFi Risks' },
          { type: 'list', items: [
            'Smart contract risk: Bugs or exploits in code',
            'Liquidation risk: Collateral value drops too low',
            'Systemic risk: Protocol or ecosystem-wide issues',
            'Market risk: Token price volatility',
            'Regulatory risk: Changing legal landscape',
            'Rug pull risk: Team abandons project'
          ]},
          { type: 'highlight', text: '⚖️ Never invest more than you can afford to lose in DeFi protocols.' },
          { type: 'heading', text: 'Risk Management Framework' },
          { type: 'list', items: [
            'Diversify across protocols and strategies',
            'Start small and scale gradually',
            'Use only audited, reputable protocols',
            'Set stop-losses and exit strategies',
            'Keep emergency funds in stablecoins',
            'Monitor positions regularly'
          ]},
        ]
      },
      {
        title: 'Portfolio Optimization',
        duration: '17 min',
        content: [
          { type: 'paragraph', text: 'Optimizing your DeFi portfolio balances risk, returns, and capital efficiency. Strategic allocation maximizes gains while protecting downside.' },
          { type: 'heading', text: 'Portfolio Construction' },
          { type: 'list', items: [
            'Core positions: 50-60% in reliable, lower-risk strategies',
            'Growth positions: 30-40% in moderate-risk opportunities',
            'Speculation: 10-20% in high-risk, high-reward plays',
            'Always maintain emergency reserves'
          ]},
          { type: 'highlight', text: '💼 Rebalance quarterly or when allocations drift more than 10% from targets.' },
          { type: 'heading', text: 'Performance Tracking' },
          { type: 'paragraph', text: 'Track your returns in both dollar terms and against benchmarks (e.g., simply holding SOL). Use portfolio tracking tools like DeBank, Zapper, or spreadsheets.' },
          { type: 'list', items: [
            'Calculate true APY including all costs',
            'Track gas fees and transaction costs',
            'Monitor impermanent loss vs. fees earned',
            'Compare against hodling strategy',
            'Review and adjust strategy monthly'
          ]},
        ]
      }
    ]
  },
  programming: {
    lessons: [
      {
        title: 'Solana Architecture',
        duration: '25 min',
        content: [
          { type: 'paragraph', text: 'Solana\'s architecture is fundamentally different from other blockchains, enabling its exceptional performance. Understanding this architecture is crucial for building on Solana.' },
          { type: 'heading', text: 'Core Components' },
          { type: 'list', items: [
            'Proof of History (PoH): Cryptographic clock for timestamping',
            'Tower BFT: PoH-optimized consensus mechanism',
            'Turbine: Block propagation protocol',
            'Gulf Stream: Mempool-less transaction forwarding',
            'Sealevel: Parallel smart contract runtime',
            'Pipelining: Transaction processing optimization',
            'Cloudbreak: Horizontally-scaled accounts database',
            'Archivers: Distributed ledger storage'
          ]},
          { type: 'highlight', text: '⚡ Sealevel allows parallel execution of thousands of smart contracts simultaneously.' },
          { type: 'heading', text: 'Account Model' },
          { type: 'paragraph', text: 'Solana uses an account-based model where everything is an account: wallets, programs, and data. Each account has an owner (usually a program) that can modify its data.' },
        ]
      },
      {
        title: 'Programs vs Smart Contracts',
        duration: '15 min',
        content: [
          { type: 'paragraph', text: 'On Solana, we call them "programs" rather than "smart contracts." While functionally similar, Solana programs have key differences.' },
          { type: 'heading', text: 'Key Differences' },
          { type: 'list', items: [
            'Programs are stateless - state stored in separate accounts',
            'Compiled to BPF bytecode, not EVM',
            'Can be upgraded by program authority',
            'Multiple programs can execute in parallel',
            'Programs rent-exempt or pay storage rent'
          ]},
          { type: 'highlight', text: '🏗️ Solana\'s separation of code and data enables parallel execution and efficient upgrades.' },
          { type: 'heading', text: 'Native Programs' },
          { type: 'paragraph', text: 'Solana includes several native programs like System Program, Token Program, and Associated Token Account Program. Your programs interact with these built-in programs.' },
        ]
      },
      {
        title: 'Rust Basics',
        duration: '30 min',
        content: [
          { type: 'paragraph', text: 'Rust is the primary language for Solana program development. Its focus on safety, performance, and concurrency makes it ideal for blockchain development.' },
          { type: 'heading', text: 'Why Rust?' },
          { type: 'list', items: [
            'Memory safety without garbage collection',
            'Zero-cost abstractions',
            'Fearless concurrency',
            'Excellent error handling',
            'Strong type system',
            'Performance comparable to C/C++'
          ]},
          { type: 'heading', text: 'Essential Rust Concepts' },
          { type: 'list', items: [
            'Ownership and borrowing',
            'Lifetimes',
            'Pattern matching',
            'Error handling with Result',
            'Traits and generics',
            'Macros'
          ]},
          { type: 'highlight', text: '🦀 Rust prevents common bugs like null pointer dereferences and buffer overflows at compile time.' },
          { type: 'code', text: `// Simple Rust function example\nfn add_numbers(a: u64, b: u64) -> Result<u64, String> {\n    a.checked_add(b)\n        .ok_or("Overflow occurred".to_string())\n}` },
        ]
      },
      {
        title: 'Anchor Framework',
        duration: '25 min',
        content: [
          { type: 'paragraph', text: 'Anchor is the most popular framework for Solana development. It simplifies program development with helpful macros, automatic account validation, and better security.' },
          { type: 'heading', text: 'Why Use Anchor?' },
          { type: 'list', items: [
            'Reduces boilerplate code significantly',
            'Automatic serialization/deserialization',
            'Built-in security checks',
            'IDL generation for client integration',
            'Better testing framework',
            'TypeScript client library'
          ]},
          { type: 'highlight', text: '⚓ Anchor reduces Solana program code by ~60% compared to native Rust.' },
          { type: 'code', text: `// Basic Anchor program structure\n#[program]\npub mod my_program {\n    use super::*;\n    \n    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {\n        // Your logic here\n        Ok(())\n    }\n}` },
          { type: 'heading', text: 'Core Concepts' },
          { type: 'list', items: [
            'Accounts: Define account structure',
            'Instructions: Program entry points',
            'Context: Instruction accounts wrapper',
            'Account constraints: Automatic validation',
            'Events: Emit logs for indexing'
          ]},
        ]
      },
      {
        title: 'Building Your First dApp',
        duration: '25 min',
        content: [
          { type: 'paragraph', text: 'Let\'s put it all together and build a simple decentralized application on Solana using Anchor and a React frontend.' },
          { type: 'heading', text: 'Development Environment' },
          { type: 'list', items: [
            'Install Rust and Solana CLI',
            'Install Anchor framework',
            'Set up local validator for testing',
            'Configure wallet for devnet',
            'Install Node.js for frontend'
          ]},
          { type: 'heading', text: 'Building a Counter Program' },
          { type: 'paragraph', text: 'We\'ll build a simple on-chain counter that anyone can increment. This demonstrates core concepts: program structure, accounts, instructions, and client interaction.' },
          { type: 'code', text: `// Counter program\n#[account]\npub struct Counter {\n    pub count: u64,\n}\n\npub fn increment(ctx: Context<Increment>) -> Result<()> {\n    ctx.accounts.counter.count += 1;\n    Ok(())\n}` },
          { type: 'highlight', text: '🚀 Once comfortable with basics, explore more complex programs like token vesting, voting, or NFT minting.' },
          { type: 'heading', text: 'Testing & Deployment' },
          { type: 'list', items: [
            'Write unit tests in Rust',
            'Test on local validator',
            'Deploy to devnet for testing',
            'Audit code thoroughly',
            'Deploy to mainnet when ready'
          ]},
        ]
      }
    ]
  }
};