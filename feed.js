"use strict";
// Shared feed transport: fetch Gmail's unread atom feeds (Inbox, all unread,
// user-listed labels) and collect rows. Loaded by popup.html and the
// background script; parsing/ranking lives in extractor.js (OtpPeek).

const FEED_ORIGINS = ["https://mail.google.com/*"];
const ACCOUNT_SLOTS = 3;

async function fetchFeed(url) {
  const resp = await fetch(url, { credentials: "include" });
  if (!resp.ok) return null;
  const text = await resp.text();
  // Signed-out slots redirect to a login HTML page — not a feed.
  return text.includes("<feed") ? OtpPeek.parseFeed(text) : null;
}

// Labels saved by the options page; none saved (or no storage) → none.
async function loadLabels() {
  try {
    const { labels } = await (globalThis.browser ?? globalThis.chrome).storage.local.get({ labels: [] });
    return Array.isArray(labels) ? labels : [];
  } catch {
    return [];
  }
}

async function collectRows() {
  const labels = await loadLabels();
  const rows = [];
  const seen = new Set();
  let anyFeed = false;
  for (let u = 0; u < ACCOUNT_SLOTS; u++) {
    const [inboxUrl, ...extraUrls] = OtpPeek.feedUrls(u, labels);
    // Inbox first: a signed-out slot fails here, so skip its other feeds.
    const inbox = await fetchFeed(inboxUrl).catch(() => null);
    if (inbox === null) continue;
    anyFeed = true;
    // A label feed Gmail doesn't serve comes back null — skip it.
    const extras = await Promise.all(extraUrls.map((url) => fetchFeed(url).catch(() => null)));
    for (const feedRows of [inbox, ...extras]) {
      // The same mail can sit in several feeds (Inbox + label + unread).
      for (const row of feedRows ?? []) {
        const key = `${row.ts}|${row.subject}`;
        if (seen.has(key)) continue;
        seen.add(key);
        rows.push(row);
      }
    }
  }
  return { rows, anyFeed };
}
