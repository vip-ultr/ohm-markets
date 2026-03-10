import React from 'react';
import { useCopy } from '../hooks/useCopy';
import './Footer.css';

const CONTRACT_ADDRESS = 'AEr2qYWmT7kHzPnE6UBsXdN1W9vMcJ3LfGiQpRoS5Vh';

export default function Footer() {
  const { copied, copy } = useCopy();

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Left — Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">Ω</div>
            <span className="footer-logo-text">Ohm</span>
          </div>
          <div className="footer-slogan">Detect. Analyze. Act.</div>
        </div>

        {/* Center — CA + Socials */}
        <div className="footer-center">
          <div>
            <div className="footer-ca-label">Contract Address</div>
            <div className="footer-ca">
              <span className="footer-ca-addr">
                {CONTRACT_ADDRESS.slice(0, 20)}…
              </span>
              <button
                className="copy-icon-btn"
                onClick={() => copy(CONTRACT_ADDRESS)}
                title="Copy address"
              >
                ⎘
              </button>
            </div>
          </div>
          <div className="footer-socials">
            <a href="https://x.com"       target="_blank" rel="noreferrer" className="footer-social" title="X / Twitter">𝕏</a>
            <a href="https://github.com"  target="_blank" rel="noreferrer" className="footer-social" title="GitHub">⌥</a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="footer-social" title="Discord">◈</a>
          </div>
        </div>

        {/* Right — Powered by Solana */}
        <div className="footer-right">
          <div className="powered-by">Powered by</div>
          <div className="powered-sol">◎ SOL<span className="sol-dot">ANA</span></div>
        </div>

      </div>

      {copied && <div className="copied-toast">Address Copied!</div>}
    </footer>
  );
}
