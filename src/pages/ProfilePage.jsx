import React, { useState } from 'react';
import { useCopy } from '../hooks/useCopy';
import { WALLET_HOLDINGS, WALLET_HISTORY } from '../data/mockData';
import './ProfilePage.css';

const WALLET_ADDR = '0x3fB8aA2e91cD7F4d9082bCa1c0e8D9f7a2E3f8d2';

export default function ProfilePage({ connected, setConnected }) {
  const [holdTab, setHoldTab] = useState('holdings');
  const { copy, copied } = useCopy();

  /* ── Not connected ── */
  if (!connected) {
    return (
      <div className="page-enter">
        <div className="profile-connect">
          <div className="profile-connect-icon">◎</div>
          <div className="profile-connect-msg">Connect to see your portfolio</div>
          <div className="profile-connect-sub">
            Link your wallet or sign in with email or social via Privy
          </div>
          <button
            className="connect-btn"
            style={{ padding: '12px 32px', fontSize: '15px' }}
            onClick={() => setConnected(true)}
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
          <div className="wallet-connected-label">Connected Wallet</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="wallet-addr">
              {WALLET_ADDR.slice(0, 18)}…{WALLET_ADDR.slice(-6)}
            </span>
            <button className="copy-icon-btn" onClick={() => copy(WALLET_ADDR)}>⎘</button>
          </div>
        </div>
        <button
          className="time-btn"
          style={{ marginLeft: 'auto' }}
          onClick={() => setConnected(false)}
        >
          Disconnect
        </button>
      </div>

      {/* Balances */}
      <div className="balances-grid">
        <div className="balance-card">
          <div className="balance-label">Total Balance</div>
          <div className="balance-value">$4,213</div>
          <div className="balance-sub">All assets in USD</div>
        </div>
        <div className="balance-card">
          <div className="balance-label">SOL Balance</div>
          <div className="balance-value">12.4 SOL</div>
          <div className="balance-sub">≈ $2,232 USD</div>
        </div>
        <div className="balance-card">
          <div className="balance-label">Token Balance</div>
          <div className="balance-value">$1,981</div>
          <div className="balance-sub">Across 4 tokens</div>
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
          {holdTab === 'holdings' ? (
            <table className="data-table">
              <thead>
                <tr><th>Token</th><th>Balance</th><th>Value</th><th>Price</th></tr>
              </thead>
              <tbody>
                {WALLET_HOLDINGS.map((r, i) => (
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
                {WALLET_HISTORY.map((r, i) => (
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
