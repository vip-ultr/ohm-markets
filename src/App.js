import React, { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import HomePage    from './pages/HomePage';
import TokenPage   from './pages/TokenPage';
import ProfilePage from './pages/ProfilePage';

/**
 * App — root component
 * Auth state is owned by Privy; we derive connected/walletAddress from it.
 */
export default function App() {
  const [page,          setPage]          = useState('home');
  const [dark,          setDark]          = useState(true);
  const [selectedToken, setSelectedToken] = useState(null);

  // Privy auth
  const { authenticated, user } = usePrivy();
  const { wallets }             = useWallets();

  // Derive the primary wallet address
  const primaryWallet = wallets?.[0] ?? null;
  const walletAddress = primaryWallet?.address ?? null;
  const connected     = authenticated;

  // Apply dark/light class to body
  useEffect(() => {
    document.body.className = dark ? '' : 'light-mode';
  }, [dark]);

  return (
    <div className="page-wrap">
      <Navbar
        setPage={setPage}
        dark={dark}
        setDark={setDark}
        connected={connected}
        walletAddress={walletAddress}
      />

      <main className="main-content">
        {page === 'home' && (
          <HomePage
            setPage={setPage}
            setSelectedToken={setSelectedToken}
          />
        )}
        {page === 'token' && (
          <TokenPage
            token={selectedToken}
            setPage={setPage}
          />
        )}
        {page === 'profile' && (
          <ProfilePage
            connected={connected}
            walletAddress={walletAddress}
            user={user}
            setPage={setPage}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
