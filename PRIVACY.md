# OTP Peek privacy policy

Effective 2026-10-23. Applies to the OTP Peek browser extension in every
browser and store it is distributed through.

## Short version

OTP Peek reads your unread Gmail feeds **inside your browser** to find
one-time login codes. Nothing it reads is stored, and nothing is sent anywhere
except the request to Gmail itself. The only thing it saves is the optional
list of Gmail label names you type into its settings. There are no analytics, ads, accounts, or
servers.

## What the extension accesses

When you open the popup or press the copy hotkey, the extension requests these
Gmail feeds (N = 0, 1, 2, one per signed-in account) with your browser's
existing Gmail session:

- `https://mail.google.com/mail/u/N/feed/atom`: unread mail in your Inbox
- `https://mail.google.com/mail/u/N/feed/atom/unread`: unread mail under any
  label, where Gmail provides this feed
- `https://mail.google.com/mail/u/N/feed/atom/<label>`: unread mail under each
  label you listed in the extension's settings (none by default)

For **unread mail only**, Google returns:

- subject line
- a short snippet preview of the body
- sender name and address
- received time

It does not access full message bodies, read mail, attachments, contacts, or
your Google password, and it cannot send, delete, or modify mail.

## How that data is used

Solely to find and show one-time codes from the last 20 minutes. The feed is
parsed in memory, the top three codes are shown in the popup (or the newest
one is copied, for the hotkey), and everything is discarded when the popup
closes or the hotkey action finishes.

When you click a code or press the hotkey, that code is written to your
system clipboard. That is the only thing the extension writes anywhere.

## What is stored

Only the Gmail label names you enter in the extension's settings, kept in the
browser's extension storage on your device so the extension knows which extra
feeds to read. Nothing it reads from Gmail is stored: no codes, no mail, no
history. It uses no cookies of its own, IndexedDB, or other persistence.

## What is shared

Nothing. The only network host the extension contacts is `mail.google.com`,
the same Gmail service you are already signed into. No data is sent to the
developer or any third party, and no data is sold, transferred, or used for
advertising, credit decisions, or any purpose other than the single feature
described above.

## Permissions

- **Access to `mail.google.com`** — to fetch the unread-mail feeds above.
- **`storage`** — to remember the label names you enter in settings.
- **`clipboardWrite`** — to copy the chosen code.
- **`offscreen`** (Chrome only) — lets the hotkey reach the clipboard from the
  background worker; it opens no visible page and has no network access.

## Verifying this

The extension is open source and small enough to read in one sitting:
<https://github.com/govindarajug/otp-peek>.

## Changes and contact

Changes to this policy are published in the repository above, with history.
Questions: open an issue on the repository. Security problems: use the
repository's private vulnerability reporting (see `SECURITY.md`).
