// ── Ohm Markets — Mock Data ──────────────────────────────────────────────────
// Replace with real API calls to Helius, Bags.fm, and X APIs

export const TOKENS = [
  { id: 1,  name: "GIGA",    ticker: "GIGA",  price: "$0.00482",    age: "2h",  mcap: "$4.82M",   change: "+18.4%", pos: true,  avatar: "G", isNew: true,  isHot: false },
  { id: 2,  name: "MOODENG", ticker: "MOOD",  price: "$0.000134",   age: "5h",  mcap: "$1.34M",   change: "+6.1%",  pos: true,  avatar: "M", isNew: false, isHot: true  },
  { id: 3,  name: "PNUT",    ticker: "PNUT",  price: "$0.0271",     age: "1d",  mcap: "$27.1M",   change: "-3.5%",  pos: false, avatar: "P", isNew: false, isHot: false },
  { id: 4,  name: "SIGMA",   ticker: "SIGMA", price: "$0.00099",    age: "3h",  mcap: "$990K",    change: "+22.0%", pos: true,  avatar: "S", isNew: true,  isHot: true  },
  { id: 5,  name: "DEGEN",   ticker: "DEGEN", price: "$0.00340",    age: "12h", mcap: "$3.40M",   change: "+4.0%",  pos: true,  avatar: "D", isNew: false, isHot: false },
  { id: 6,  name: "TURBO",   ticker: "TURBO", price: "$0.00155",    age: "2d",  mcap: "$1.55M",   change: "-1.2%",  pos: false, avatar: "T", isNew: false, isHot: false },
  { id: 7,  name: "WIF",     ticker: "WIF",   price: "$0.1720",     age: "8h",  mcap: "$169.4M",  change: "-3.5%",  pos: false, avatar: "W", isNew: false, isHot: false },
  { id: 8,  name: "BONK",    ticker: "BONK",  price: "$0.00000599", age: "3d",  mcap: "$499.9M",  change: "+4.0%",  pos: true,  avatar: "B", isNew: false, isHot: true  },
];

export const TRENDING = [
  { name: "GIGA",    change: "+18.4%", pos: true  },
  { name: "SIGMA",   change: "+22.0%", pos: true  },
  { name: "MOODENG", change: "+6.1%",  pos: true  },
  { name: "BONK",    change: "+4.0%",  pos: true  },
  { name: "WIF",     change: "-3.5%",  pos: false },
];

export const OVERVIEW_STATS = {
  totalLaunched: "2,847",
  launchedToday: "+124 today",
  volume24h: "$22.75M",
  volumeChange: "↑ 14.2% vs yesterday",
  activeTraders: "8,391",
  topToken: "SIGMA",
  topTokenChange: "+22.0% today",
};

export const TOKEN_TRADES = [
  { time: "2m ago",  type: "buy",  amount: "142,000", value: "$682"   },
  { time: "5m ago",  type: "sell", amount: "89,000",  value: "$429"   },
  { time: "9m ago",  type: "buy",  amount: "310,000", value: "$1,494" },
  { time: "14m ago", type: "buy",  amount: "55,000",  value: "$265"   },
  { time: "22m ago", type: "sell", amount: "200,000", value: "$964"   },
];

export const TOKEN_HOLDERS = [
  { wallet: "5xR2…a9Kp", balance: "4,200,000", pct: "4.20%", value: "$20,244" },
  { wallet: "GjT7…3mNq", balance: "3,100,000", pct: "3.10%", value: "$14,942" },
  { wallet: "Yw8L…d1Bv", balance: "2,800,000", pct: "2.80%", value: "$13,496" },
  { wallet: "KpM4…z6Xt", balance: "1,950,000", pct: "1.95%", value: "$9,402"  },
  { wallet: "NcF9…q2Rs", balance: "1,400,000", pct: "1.40%", value: "$6,748"  },
];

export const TOKEN_WHALES = [
  { type: "buy",  wallet: "5xR2…a9Kp", qty: "4,200,000", value: "$20,244" },
  { type: "sell", wallet: "AbH3…k8Vn", qty: "3,800,000", value: "$18,316" },
  { type: "buy",  wallet: "Pw6T…j2Lm", qty: "2,100,000", value: "$10,122" },
];

export const WALLET_HOLDINGS = [
  { token: "SOL",     balance: "12.4",      value: "$2,232", price: "$180.00"    },
  { token: "GIGA",    balance: "142,000",   value: "$684",   price: "$0.00482"   },
  { token: "MOODENG", balance: "8,400,000", value: "$1,126", price: "$0.000134"  },
  { token: "BONK",    balance: "28,500,000",value: "$171",   price: "$0.000006"  },
];

export const WALLET_HISTORY = [
  { time: "2h ago", token: "GIGA",    amount: "142,000",  price: "$0.00482"  },
  { time: "5h ago", token: "MOODENG", amount: "8,400,000",price: "$0.000130" },
  { time: "1d ago", token: "SIGMA",   amount: "500,000",  price: "$0.00081"  },
  { time: "2d ago", token: "PNUT",    amount: "10,000",   price: "$0.0285"   },
];

// ── API Config (fill in your keys) ──────────────────────────────────────────
export const API_CONFIG = {
  helius:  { baseUrl: "https://api.helius.xyz/v0", apiKey: "YOUR_HELIUS_API_KEY" },
  bagsfm:  { baseUrl: "https://api.bags.fm",        apiKey: "YOUR_BAGS_API_KEY"  },
  twitter: { baseUrl: "https://api.twitter.com/2",  bearerToken: "YOUR_TWITTER_BEARER_TOKEN" },
  privy:   { appId: "YOUR_PRIVY_APP_ID" },
};
