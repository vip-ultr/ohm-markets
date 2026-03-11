/**
 * twitter.js — X (Twitter) API v2 helpers
 *
 * All requests go through the CRA dev-proxy (/api/twitter → api.twitter.com)
 * so the Bearer token stays server-side and CORS is never an issue.
 *
 * Endpoints used:
 *   GET /2/tweets/search/recent  — recent tweets mentioning a query
 *   GET /2/tweets/counts/recent  — aggregate mention count over last 7 days
 */

const BASE = '/api/twitter';

/**
 * Fetch the last `maxResults` tweets mentioning `query`.
 * Returns array of { id, text, created_at, author_id, public_metrics }
 */
export async function fetchRecentTweets(query, maxResults = 10) {
  const params = new URLSearchParams({
    query:        `${query} -is:retweet lang:en`,
    max_results:  maxResults,
    'tweet.fields': 'created_at,public_metrics,author_id',
  });

  const res = await fetch(`${BASE}/2/tweets/search/recent?${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.title || `Twitter ${res.status}`);
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Fetch total mention count for `query` over the past 7 days.
 * Returns a number (sum of all daily buckets).
 */
export async function fetchMentionCount(query) {
  const params = new URLSearchParams({
    query:       `${query} -is:retweet lang:en`,
    granularity: 'day',
  });

  const res = await fetch(`${BASE}/2/tweets/counts/recent?${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.title || `Twitter ${res.status}`);
  }
  const json = await res.json();
  const total = (json.data || []).reduce((acc, d) => acc + (d.tweet_count || 0), 0);
  return total;
}

/** Format ISO timestamp → "2h ago" style */
export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
