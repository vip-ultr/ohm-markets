import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import './Navbar.css';

/**
 * Navbar — fixed top navigation
 * Props:
 *   setPage       {fn}     — navigate to "home" | "profile" | "token"
 *   dark          {bool}   — current theme
 *   setDark       {fn}     — toggle theme
 *   connected     {bool}   — wallet connection state (from Privy)
 *   walletAddress {string} — primary wallet address (from Privy)
 */
export default function Navbar({ setPage, dark, setDark, connected, walletAddress }) {
  const { login, logout } = usePrivy();

  const shortAddr = walletAddress
    ? `${walletAddress.slice(0, 4)}…${walletAddress.slice(-4)}`
    : 'Connected';

  return (
    <nav className="navbar">
      {/* Logo */}
      <button className="nav-logo" onClick={() => setPage('home')}>
        <div className="nav-logo-icon">Ω</div>
        <span className="nav-logo-text">Ohm</span>
      </button>

      {/* Search */}
      <div className="nav-search">
        <span className="nav-search-icon">⌕</span>
        <input placeholder="Search tokens on Bags.fm…" />
      </div>

      {/* Right controls */}
      <div className="nav-right">
        <button
          className="icon-btn"
          onClick={() => setDark(!dark)}
          title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {dark ? '☀' : '☾'}
        </button>

        <button
          className="icon-btn"
          onClick={() => setPage('profile')}
          title="Profile / Wallet"
        >
          ◎
        </button>

        {!connected ? (
          <button
            className="connect-btn connect-btn-hide"
            onClick={login}
          >
            Connect
          </button>
        ) : (
          <button
            className="connect-btn connect-btn-hide"
            onClick={() => setPage('profile')}
          >
            {shortAddr}
          </button>
        )}
      </div>
    </nav>
  );
}
