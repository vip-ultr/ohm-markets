import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrivyProvider } from '@privy-io/react-auth';
import './styles/global.css';
import App from './App';

const PRIVY_APP_ID = process.env.REACT_APP_PRIVY_APP_ID || 'cmmm7yae2015f0cjxb82ztua7';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email', 'google', 'twitter'],
        appearance: {
          theme: 'dark',
          accentColor: '#9B6EFF',
          logo: 'Ω',
          // Show only Solana wallets (Phantom, Solflare, Backpack, etc.)
          walletChainType: 'solana-only',
        },
        embeddedWallets: {
          // Nested per-chain config — creates a Solana embedded wallet on login
          solana: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
