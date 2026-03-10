import React from 'react';
import './Navbar.css';

/**
 * Navbar — fixed top navigation
 * Props:
 *   setPage      {fn}     — navigate to "home" | "profile" | "token"
 *   dark         {bool}   — current theme
 *   setDark      {fn}     — toggle theme
 *   connected    {bool}   — wallet connection state
 *   setConnected {fn}     — update connection state
 */
export default function Navbar({ setPage, dark, setDark, connected, setConnected }) {
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
            onClick={() => { setConnected(true); setPage('profile'); }}
          >
            Connect
          </button>
        ) : (
          <button
            className="connect-btn connect-btn-hide"
            onClick={() => setPage('profile')}
          >
            0x3f…a8d2
          </button>
        )}
      </div>
    </nav>
  );
}
