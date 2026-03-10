import { useState } from 'react';

/**
 * useCopy — copies text to clipboard and shows a temporary "copied" state
 * Usage:
 *   const { copied, copy } = useCopy();
 *   <button onClick={() => copy("0xabc…")}>Copy</button>
 *   {copied && <span>Copied!</span>}
 */
export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  };

  return { copied, copy };
}
