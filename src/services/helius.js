// ── Helius API Service ────────────────────────────────────────────────────────
const BASE  = process.env.REACT_APP_HELIUS_BASE_URL;
const KEY   = process.env.REACT_APP_HELIUS_API_KEY;
const RPC   = `https://api-mainnet.helius-rpc.com/?api-key=${KEY}`;

// ── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(unixTs) {
  const diff = Math.floor(Date.now() / 1000) - unixTs;
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function shortenAddr(addr) {
  if (!addr) return '—';
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

function fmtAmount(raw, decimals = 6) {
  const n = raw / Math.pow(10, decimals);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(2)}K`;
  return n.toFixed(4);
}

// ── Wallet Balances (ProfilePage) ─────────────────────────────────────────────
// Returns: { sol, usdSol, tokens: [{ token, balance, value, price }] }
export async function fetchWalletBalances(walletAddress) {
  const res  = await fetch(`${BASE}/addresses/${walletAddress}/balances?api-key=${KEY}`);
  if (!res.ok) throw new Error(`Helius balances: ${res.status}`);
  const data = await res.json();

  const solBalance = (data.nativeBalance / 1e9).toFixed(4);

  const tokens = (data.tokens || []).map(t => ({
    token:   t.symbol || shortenAddr(t.mint),
    balance: fmtAmount(t.amount, t.decimals),
    mint:    t.mint,
    value:   '—',   // price lookup handled separately
    price:   '—',
  }));

  return { sol: solBalance, tokens };
}

// ── Wallet Transactions (ProfilePage history) ─────────────────────────────────
// Returns: [{ time, token, amount, price }]
export async function fetchWalletTransactions(walletAddress, limit = 20) {
  const res  = await fetch(
    `${BASE}/addresses/${walletAddress}/transactions?api-key=${KEY}&limit=${limit}`
  );
  if (!res.ok) throw new Error(`Helius txns: ${res.status}`);
  const data = await res.json();

  return data
    .filter(tx => tx.tokenTransfers?.length > 0)
    .map(tx => {
      const transfer = tx.tokenTransfers[0];
      return {
        time:   timeAgo(tx.timestamp),
        token:  transfer.symbol || shortenAddr(transfer.mint),
        amount: fmtAmount(transfer.tokenAmount, 0),
        price:  '—',
        type:   transfer.toUserAccount === walletAddress ? 'buy' : 'sell',
      };
    });
}

// ── Token Transactions (TokenPage trades tab) ─────────────────────────────────
// Returns: [{ time, type, amount, value }]
export async function fetchTokenTransactions(mintAddress, limit = 20) {
  const res  = await fetch(
    `${BASE}/addresses/${mintAddress}/transactions?api-key=${KEY}&limit=${limit}`
  );
  if (!res.ok) throw new Error(`Helius token txns: ${res.status}`);
  const data = await res.json();

  return data
    .filter(tx => tx.tokenTransfers?.length > 0)
    .map(tx => {
      const transfer = tx.tokenTransfers[0];
      const solValue = tx.nativeTransfers?.reduce((sum, n) => sum + n.amount, 0) || 0;
      return {
        time:   timeAgo(tx.timestamp),
        type:   transfer.toUserAccount ? 'buy' : 'sell',
        amount: fmtAmount(transfer.tokenAmount, 0),
        value:  solValue > 0 ? `${(solValue / 1e9).toFixed(4)} SOL` : '—',
      };
    });
}

// ── Token Holders (TokenPage holders tab) ─────────────────────────────────────
// Returns: [{ wallet, balance, pct, value }]
export async function fetchTokenHolders(mintAddress) {
  const res = await fetch(RPC, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      jsonrpc: '2.0',
      id:      1,
      method:  'getTokenLargestAccounts',
      params:  [mintAddress],
    }),
  });
  if (!res.ok) throw new Error(`Helius holders: ${res.status}`);
  const { result } = await res.json();

  const accounts = result?.value || [];
  const total    = accounts.reduce((s, a) => s + Number(a.uiAmount), 0);

  return accounts.map(a => ({
    wallet:  shortenAddr(a.address),
    balance: Number(a.uiAmount).toLocaleString(),
    pct:     total > 0 ? `${((a.uiAmount / total) * 100).toFixed(2)}%` : '—',
    value:   '—',
  }));
}

// ── Token Metadata (price, supply, holders count) ────────────────────────────
// Returns raw Helius token metadata object
export async function fetchTokenMetadata(mintAddresses) {
  const res = await fetch(`${BASE}/token-metadata?api-key=${KEY}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ mintAccounts: mintAddresses }),
  });
  if (!res.ok) throw new Error(`Helius metadata: ${res.status}`);
  return res.json();
}
