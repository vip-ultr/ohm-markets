import React, { useState } from 'react';
import Sparkline from '../components/Sparkline';
import { TOKENS, TRENDING, OVERVIEW_STATS } from '../data/mockData';
import './HomePage.css';

export default function HomePage({ setPage, setSelectedToken }) {
  const [timeframe, setTimeframe] = useState('24H');
  const [activeTab, setActiveTab] = useState('trending');

  const tabs = [
    { id: 'watchlist', label: '☆ Watchlist' },
    { id: 'trending',  label: '🔥 Trending'  },
    { id: 'new',       label: '✦ New'        },
    { id: 'majors',    label: 'Majors'       },
    { id: 'defi',      label: 'DeFi'         },
  ];

  const handleTokenClick = (token) => {
    setSelectedToken(token);
    setPage('token');
  };

  return (
    <div className="page-enter">

      {/* ── Overview Cards ── */}
      <div className="cards-grid">
        <div className="card">
          <div className="card-label">Total Tokens Launched</div>
          <div className="card-value">{OVERVIEW_STATS.totalLaunched}</div>
          <div className="card-sub">{OVERVIEW_STATS.launchedToday}</div>
        </div>
        <div className="card">
          <div className="card-label">24H Volume</div>
          <div className="card-value">{OVERVIEW_STATS.volume24h}</div>
          <div className="card-sub">{OVERVIEW_STATS.volumeChange}</div>
        </div>
        <div className="card">
          <div className="card-label">Active Traders</div>
          <div className="card-value">{OVERVIEW_STATS.activeTraders}</div>
          <div className="card-sub">Past 24 hours</div>
        </div>
        <div className="card">
          <div className="card-label">Top Token</div>
          <div className="card-value">{OVERVIEW_STATS.topToken}</div>
          <div className="card-sub">{OVERVIEW_STATS.topTokenChange}</div>
        </div>
      </div>

      {/* ── Trending Strip ── */}
      <div className="trending-strip">
        <span className="trend-label">🔥 Hot</span>
        {TRENDING.map(t => (
          <div
            key={t.name}
            className="trend-item"
            onClick={() => handleTokenClick(TOKENS.find(tk => tk.ticker === t.name) || TOKENS[0])}
          >
            <span className="trend-item-name">{t.name}</span>
            <span
              className="trend-item-change"
              style={{ color: t.pos ? 'var(--green)' : 'var(--red)' }}
            >
              {t.change}
            </span>
          </div>
        ))}
      </div>

      {/* ── Tabs + Launchpad ── */}
      <div className="tabs-row">
        <div className="tab-bar" style={{ marginBottom: 0, border: 'none' }}>
          {tabs.map(t => (
            <div
              key={t.id}
              className={`tab-item ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div className="launchpad-selector">
          <div className="launch-chip active">Bags.fm</div>
        </div>
      </div>
      <div className="green-line" style={{ marginBottom: '16px' }} />

      {/* ── Time Filter ── */}
      <div className="time-bar">
        <div className="vol-label">
          <span className="live-dot" />
          Total Vol: <span style={{ color: 'var(--text2)' }}>$22.75M</span>
        </div>
        <div className="time-btns">
          {['1H', '24H', '7D', '30D'].map(t => (
            <button
              key={t}
              className={`time-btn ${timeframe === t ? 'active' : ''}`}
              onClick={() => setTimeframe(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Token Table ── */}
      <div className="token-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="token-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>#</th>
                <th>Token</th>
                <th className="right">Price</th>
                <th className="right">Trendline</th>
                <th className="right">Change</th>
                <th className="right">Age</th>
                <th className="right">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((token, i) => (
                <tr key={token.id} onClick={() => handleTokenClick(token)}>
                  <td className="token-row-num">{i + 1}</td>
                  <td>
                    <div className="token-info">
                      <div className="token-avatar">{token.avatar}</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="token-name">{token.name}</span>
                          {token.isNew && <span className="new-badge">New</span>}
                          {token.isHot && <span className="hot-badge">Hot</span>}
                        </div>
                        <div className="token-ticker">${token.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td><div className="token-price">{token.price}</div></td>
                  <td style={{ textAlign: 'right' }}>
                    <Sparkline pos={token.pos} seed={token.id} />
                  </td>
                  <td>
                    <div className={token.pos ? 'change-pos' : 'change-neg'}>
                      {token.change}
                    </div>
                  </td>
                  <td><div className="token-age">{token.age}</div></td>
                  <td><div className="token-mcap">{token.mcap}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
