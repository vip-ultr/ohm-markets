import React, { useState, useEffect } from 'react';
import PriceChart from '../components/PriceChart';
import { useCopy } from '../hooks/useCopy';
import { TOKEN_TRADES, TOKEN_HOLDERS, TOKEN_WHALES } from '../data/mockData';
import { fetchTokenTransactions, fetchTokenHolders } from '../services/helius';
import './TokenPage.css';

export default function TokenPage({ token, setPage }) {
  const [chartTime, setChartTime] = useState('24H');
  const [dataTab,   setDataTab]   = useState('trades');
  const { copy, copied } = useCopy();

  const [trades,      setTrades]      = useState(TOKEN_TRADES);
  const [holders,     setHolders]     = useState(TOKEN_HOLDERS);
  const [tradesLoad,  setTradesLoad]  = useState(false);
  const [holdersLoad, setHoldersLoad] = useState(false);
  const [tradesErr,   setTradesErr]   = useState(null);
  const [holdersErr,  setHoldersErr]  = useState(null);

  const mint     = token?.mint;
  const contract = mint || 'Hs9bCv3fKpWqMzY7RnXeUdT2AjLwPo4NgQiVmEsBh6';

  // Fetch trades when tab is opened or token changes
  useEffect(() => {
    if (!mint) return;
    setTradesLoad(true);
    setTradesErr(null);
    fetchTokenTransactions(mint)
      .then(data => setTrades(data.length ? data : TOKEN_TRADES))
      .catch(e  => setTradesErr(e.message))
      .finally(()  => setTradesLoad(false));
  }, [mint]);

  // Fetch holders when tab switches to holders
  useEffect(() => {
    if (!mint || dataTab !== 'holders') return;
    if (holders !== TOKEN_HOLDERS) return; // already fetched
    setHoldersLoad(true);
    setHoldersErr(null);
    fetchTokenHolders(mint)
      .then(data => setHolders(data.length ? data : TOKEN_HOLDERS))
      .catch(e  => setHoldersErr(e.message))
      .finally(()  => setHoldersLoad(false));
  }, [mint, dataTab]); // eslint-disable-line

  const stats = [
    { label: 'Price',      val: token?.price  || '$0.00482' },
    { label: 'Market Cap', val: token?.mcap   || '$4.82M'   },
    { label: '24H Volume', val: '$1.2M'                      },
    { label: 'Holders',    val: '3,847'                      },
    { label: 'Supply',     val: '1,000,000,000'              },
    { label: 'FDV',        val: token?.mcap   || '$4.82M'   },
    { label: 'Liquidity',  val: '$284K'                      },
    { label: 'Token Fees', val: '1.0%'                       },
  ];

  return (
    <div className="page-enter">

      {/* Back */}
      <button className="analytics-back" onClick={() => setPage('home')}>
        ← Back to Markets
      </button>

      {/* ── Header ── */}
      <div className="analytics-header">
        <div className="analytics-token-info">
          <div className="analytics-avatar">{token?.avatar || 'G'}</div>
          <div>
            <div className="analytics-name">{token?.name   || 'GIGA'}</div>
            <div className="analytics-ticker">${token?.ticker || 'GIGA'} · Bags.fm</div>
          </div>
        </div>

        <div className="analytics-actions">
          <div className="x-mentions">
            𝕏 <span className="x-mentions-count">1,284</span> mentions
          </div>

          <div className="ca-copy">
            <div>
              <div className="ca-label-small">Contract</div>
              <span className="ca-text">{contract.slice(0, 16)}…</span>
            </div>
            <button className="copy-icon-btn" onClick={() => copy(contract)}>⎘</button>
          </div>

          <div className="social-links">
            <a href="https://x.com"       target="_blank" rel="noreferrer" className="social-link">𝕏</a>
            <a href="https://t.me"        target="_blank" rel="noreferrer" className="social-link">✈</a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-link">◈</a>
          </div>

          <a href="https://bags.fm" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <button className="buy-btn">Buy on Bags.fm ↗</button>
          </a>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.val}</div>
          </div>
        ))}
      </div>

      {/* ── Price Chart ── */}
      <div className="chart-section">
        <div className="chart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-dot" />
            <span className="chart-title">Price Chart</span>
          </div>
          <div className="time-btns">
            {['1H', '24H', '30D'].map(t => (
              <button
                key={t}
                className={`time-btn ${chartTime === t ? 'active' : ''}`}
                onClick={() => setChartTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <PriceChart timeframe={chartTime} />
      </div>

      {/* ── Data Tabs ── */}
      <div className="data-tabs">
        <div className="data-tab-bar">
          {['trades', 'holders', 'whales'].map(t => (
            <div
              key={t}
              className={`data-tab ${dataTab === t ? 'active' : ''}`}
              onClick={() => setDataTab(t)}
            >
              {t === 'trades' ? 'Trades' : t === 'holders' ? 'Top Holders' : 'Whale Txns'}
            </div>
          ))}
        </div>

        <div className="data-table-wrap">
          {dataTab === 'trades' && (
            tradesLoad
              ? <div className="table-status">Loading trades…</div>
              : tradesErr
              ? <div className="table-status table-err">{tradesErr}</div>
              : (
                <table className="data-table">
                  <thead>
                    <tr><th>Time</th><th>Type</th><th>Amount</th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    {trades.map((r, i) => (
                      <tr key={i}>
                        <td>{r.time}</td>
                        <td><span className={r.type === 'buy' ? 'buy-tag' : 'sell-tag'}>{r.type.toUpperCase()}</span></td>
                        <td>{r.amount}</td>
                        <td>{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
          )}

          {dataTab === 'holders' && (
            holdersLoad
              ? <div className="table-status">Loading holders…</div>
              : holdersErr
              ? <div className="table-status table-err">{holdersErr}</div>
              : (
                <table className="data-table">
                  <thead>
                    <tr><th>Wallet</th><th>Balance</th><th>% Holdings</th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    {holders.map((r, i) => (
                      <tr key={i}>
                        <td>{r.wallet}</td>
                        <td>{r.balance}</td>
                        <td style={{ color: 'var(--green)' }}>{r.pct}</td>
                        <td>{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
          )}

          {dataTab === 'whales' && (
            <table className="data-table">
              <thead>
                <tr><th>Type</th><th>Wallet</th><th>Quantity</th><th>Value</th></tr>
              </thead>
              <tbody>
                {TOKEN_WHALES.map((r, i) => (
                  <tr key={i}>
                    <td><span className={r.type === 'buy' ? 'buy-tag' : 'sell-tag'}>{r.type.toUpperCase()}</span></td>
                    <td><span className="whale-tag">🐋</span> {r.wallet}</td>
                    <td>{r.qty}</td>
                    <td>{r.value}</td>
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
