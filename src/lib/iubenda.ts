export const IUBENDA_POLICY_ID = '65924841'

export type IubendaPolicy = 'privacy' | 'cookie'

export const IUBENDA_URLS: Record<IubendaPolicy, string> = {
  privacy: `https://www.iubenda.com/privacy-policy/${IUBENDA_POLICY_ID}`,
  cookie: `https://www.iubenda.com/privacy-policy/${IUBENDA_POLICY_ID}/cookie-policy`,
}

// Footer links with this hash open the cookie consent preferences panel.
export const COOKIE_PREFERENCES_HASH = '#controllo-cookie'

type IubendaWindow = Window & { _iub?: { cs?: { api?: { openPreferences?: () => void } } } }

// Opens the iubenda consent-preferences panel. Returns false if the Cookie
// Solution has not loaded yet (e.g. blocked by an ad blocker).
export function openIubendaPreferences(): boolean {
  const api = (window as IubendaWindow)._iub?.cs?.api
  if (typeof api?.openPreferences !== 'function') return false
  api.openPreferences()
  return true
}

// Opens the iubenda popup through the hidden trigger rendered by IubendaProvider.
// Returns false when the trigger is missing, so callers can fall back to the link.
export function openIubendaPolicy(policy: IubendaPolicy): boolean {
  const trigger = document.getElementById(`iubenda-trigger-${policy}`)
  if (!trigger) return false
  trigger.click()
  return true
}
