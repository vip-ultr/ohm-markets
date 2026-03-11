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
  const { ready, authenticated, user } = usePrivy();
  const { wallets }             = useWallets();

  // Derive the primary Solana wallet address.
  // useWallets() returns all chain types; filter for Solana so we never
  // accidentally display an EVM address in a Solana-only app.
  const solanaWallet  = wallets?.find(w => w.chainType === 'solana') ?? null;
  const walletAddress = solanaWallet?.address ?? null;
  const connected     = authenticated;

  // Apply dark/light class to body (must be before any early return — Rules of Hooks)
  useEffect(() => {
    document.body.className = dark ? '' : 'light-mode';
  }, [dark]);

  // Block render until Privy has initialised (avoids stale/undefined auth state)
  if (!ready) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text3)', fontSize: '14px', letterSpacing: '0.08em' }}>
        Loading…
      </div>
    );
  }

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
