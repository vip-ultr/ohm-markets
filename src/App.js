import React, { useState, useEffect } from 'react';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import HomePage    from './pages/HomePage';
import TokenPage   from './pages/TokenPage';
import ProfilePage from './pages/ProfilePage';

/**
 * App — root component
 * Manages global state: current page, dark/light mode, wallet connection, selected token
 */
export default function App() {
  const [page,          setPage]          = useState('home');
  const [dark,          setDark]          = useState(true);
  const [connected,     setConnected]     = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);

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
        setConnected={setConnected}
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
            setConnected={setConnected}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
