import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useCopy } from '../hooks/useCopy';
import { WALLET_HOLDINGS, WALLET_HISTORY } from '../data/mockData';
import { fetchWalletBalances, fetchWalletTransactions } from '../services/helius';
import './ProfilePage.css';

export default function ProfilePage({ connected, walletAddress, user, setPage }) {
  const { login, logout } = usePrivy();
  const [holdTab, setHoldTab] = useState('holdings');
  const { copy, copied } = useCopy();

  const [holdings,   setHoldings]   = useState(WALLET_HOLDINGS);
  const [history,    setHistory]    = useState(WALLET_HISTORY);
  const [solBalance, setSolBalance] = useState('—');
  const [totalUsd,   setTotalUsd]   = useState('—');
  const [tokenCount, setTokenCount] = useState(0);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);

  const addr = walletAddress || null;

  // Display name: prefer linked Twitter/email, fallback to short address
  const displayName = user?.twitter?.username
    ? `@${user.twitter.username}`
    : user?.email?.address
    ? user.email.address
    : addr
    ? `${addr.slice(0, 6)}…${addr.slice(-4)}`
    : 'Connected';

  useEffect(() => {
    if (!connected || !addr) return;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchWalletBalances(addr),
      fetchWalletTransactions(addr),
    ])
      .then(([balData, txData]) => {
        setSolBalance(balData.sol);
        setTokenCount(balData.tokens.length);
        if (balData.tokens.length) setHoldings(balData.tokens);
        if (txData.length)         setHistory(txData);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [connected, addr]);

  /* ── Not connected ── */
  if (!connected) {
    return (
      <div className="page-enter">
        <div className="profile-connect">
          <div className="profile-connect-icon">◎</div>
          <div className="profile-connect-msg">Connect to see your portfolio</div>
          <div className="profile-connect-sub">
            Sign in with wallet, email, Google, or Twitter via Privy
          </div>
          <button
            className="connect-btn"
            style={{ padding: '12px 32px', fontSize: '15px' }}
            onClick={login}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  /* ── Connected ── */
  return (
    <div className="page-enter">

      {/* Wallet header */}
      <div className="wallet-header">
        <div className="wallet-avatar">◎</div>
        <div>
          <div className="wallet-connected-label">Connected</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {addr ? (
              <span className="wallet-addr">
                {addr.slice(0, 8)}…{addr.slice(-6)}
              </span>
            ) : (
              <span className="wallet-addr" style={{ color: 'var(--text3)' }}>
                {displayName}
              </span>
            )}
            {addr && (
              <button className="copy-icon-btn" onClick={() => copy(addr)}>⎘</button>
            )}
          </div>
        </div>
        <button
          className="time-btn"
          style={{ marginLeft: 'auto' }}
          onClick={logout}
        >
          Disconnect
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ color: 'var(--red)', fontSize: '13px', marginBottom: '12px' }}>
          Helius error: {error} — showing cached data
        </div>
      )}

      {/* Balances */}
      <div className="balances-grid">
        <div className="balance-card">
          <div className="balance-label">Total Balance</div>
          <div className="balance-value">{loading ? '…' : totalUsd !== '—' ? totalUsd : '$4,213'}</div>
          <div className="balance-sub">All assets in USD</div>
        </div>
        <div className="balance-card">
          <div className="balance-label">SOL Balance</div>
          <div className="balance-value">{loading ? '…' : solBalance !== '—' ? `${solBalance} SOL` : '12.4 SOL'}</div>
          <div className="balance-sub">Native balance</div>
        </div>
        <div className="balance-card">
          <div className="balance-label">Token Balance</div>
          <div className="balance-value">{loading ? '…' : '$1,981'}</div>
          <div className="balance-sub">
            {loading ? 'Loading…' : `Across ${tokenCount || 4} tokens`}
          </div>
        </div>
      </div>

      {/* Holdings / History Tabs */}
      <div className="holdings-tabs">
        {['holdings', 'history'].map(t => (
          <div
            key={t}
            className={`hold-tab ${holdTab === t ? 'active' : ''}`}
            onClick={() => setHoldTab(t)}
          >
            {t === 'holdings' ? 'Holdings' : 'History'}
          </div>
        ))}
      </div>

      <div className="token-table-wrap">
        <div className="data-table-wrap">
          {loading ? (
            <div className="table-status">Fetching wallet data…</div>
          ) : holdTab === 'holdings' ? (
            <table className="data-table">
              <thead>
                <tr><th>Token</th><th>Balance</th><th>Value</th><th>Price</th></tr>
              </thead>
              <tbody>
                {holdings.map((r, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text)', fontWeight: 700 }}>{r.token}</td>
                    <td>{r.balance}</td>
                    <td style={{ color: 'var(--green)' }}>{r.value}</td>
                    <td>{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="data-table">
              <thead>
                <tr><th>Time</th><th>Token</th><th>Amount</th><th>Price</th></tr>
              </thead>
              <tbody>
                {history.map((r, i) => (
                  <tr key={i}>
                    <td>{r.time}</td>
                    <td style={{ color: 'var(--text)', fontWeight: 700 }}>{r.token}</td>
                    <td>{r.amount}</td>
                    <td>{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {copied && <div className="copied-toast">Address Copied!</div>}
    </div>
  );
}
