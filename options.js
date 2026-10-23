"use strict";
// Options page: the extra Gmail labels feed.js reads (issue #4), stored
// locally as { labels: string[] }. Nothing else is stored.

const ext = globalThis.browser ?? globalThis.chrome;
const labelsEl = document.getElementById("labels");
const statusEl = document.getElementById("status");

async function load() {
  const { labels } = await ext.storage.local.get({ labels: [] });
  labelsEl.value = labels.join("\n");
}

document.getElementById("save").addEventListener("click", async () => {
  const labels = OtpPeek.parseLabels(labelsEl.value);
  await ext.storage.local.set({ labels });
  labelsEl.value = labels.join("\n");
  statusEl.textContent = labels.length ? `Saved ${labels.length} label(s).` : "Saved. Inbox only.";
  statusEl.hidden = false;
});

load();
