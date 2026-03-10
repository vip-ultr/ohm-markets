# Ohm Markets
### Detect. Analyze. Act.

A Solana token analytics dashboard for the Bags.fm launchpad.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Install & Run

```bash
# 1. Navigate into the project folder
cd ohm-markets

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at **http://localhost:3000**

---

## 📁 Project Structure

```
ohm-markets/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── App.js                  # Root component & routing
│   ├── index.js                # React entry point
│   ├── components/
│   │   ├── Navbar.jsx          # Fixed top navigation bar
│   │   ├── Navbar.css
│   │   ├── Footer.jsx          # Footer with CA, socials, Solana badge
│   │   ├── Footer.css
│   │   ├── Sparkline.jsx       # Inline SVG trend charts
│   │   └── PriceChart.jsx      # Full price chart SVG
│   ├── pages/
│   │   ├── HomePage.jsx        # Main dashboard
│   │   ├── HomePage.css
│   │   ├── TokenPage.jsx       # Token analytics
│   │   ├── TokenPage.css
│   │   ├── ProfilePage.jsx     # Wallet / portfolio
│   │   └── ProfilePage.css
│   ├── data/
│   │   └── mockData.js         # Mock data + API config placeholders
│   ├── hooks/
│   │   └── useCopy.js          # Copy-to-clipboard hook
│   └── styles/
│       └── global.css          # CSS variables, shared styles, responsive
└── package.json
```

---

## 🔌 API Integration

All API keys are stored in `src/data/mockData.js` under `API_CONFIG`.

| Service    | Purpose                                      | Docs |
|------------|----------------------------------------------|------|
| **Helius** | Wallet assets, token metadata, tx history    | https://docs.helius.dev |
| **Bags.fm**| Token analytics, launch info, creator info   | https://bags.fm         |
| **X API**  | X/Twitter mention counts per token           | https://developer.x.com |
| **Privy**  | Wallet connect, social/email login           | https://docs.privy.io   |

Replace `YOUR_*_KEY` placeholders in `mockData.js` with your real keys.

---

## 🎨 Design System

| Token         | Value                   |
|---------------|-------------------------|
| Primary green | `#03A338`               |
| Background    | `#000000`               |
| Card bg       | `#111111`               |
| Primary font  | Rajdhani (Futura-style) |
| Mono font     | Share Tech Mono         |

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `/build` folder — ready to deploy to Vercel, Netlify, or any static host.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout         |
|------------|----------------|
| > 900px    | Full desktop   |
| 600–900px  | Tablet (2-col) |
| < 600px    | Mobile (1-col) |
