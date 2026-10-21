export const CONSENT_KEY = 'ek-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
export const OPEN_PREFS_EVENT = 'ek-open-cookie-prefs';

export function readConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (!saved || saved.v !== CONSENT_VERSION || typeof saved.analytics !== 'boolean') return null;
    if (Date.now() - saved.ts > CONSENT_MAX_AGE_MS) return null;
    return saved;
  } catch {
    return null;
  }
}

export function writeConsent(analytics) {
  const consent = { v: CONSENT_VERSION, analytics, ts: Date.now() };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch {}
  return consent;
}
