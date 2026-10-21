'use client';
import { sx } from '../lib/sx';
import { OPEN_PREFS_EVENT } from '../lib/consent';

export default function CookiePrefsButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))} style={sx('background:none;border:none;padding:0;font-family:inherit;font-size:14px;color:var(--muted);cursor:pointer;')}>
      Preferências de cookies
    </button>
  );
}
