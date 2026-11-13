export const IUBENDA_POLICY_ID = '65924841'

export type IubendaPolicy = 'privacy' | 'cookie'

export const IUBENDA_URLS: Record<IubendaPolicy, string> = {
  privacy: `https://www.iubenda.com/privacy-policy/${IUBENDA_POLICY_ID}`,
  cookie: `https://www.iubenda.com/privacy-policy/${IUBENDA_POLICY_ID}/cookie-policy`,
}

// Opens the iubenda popup through the hidden trigger rendered by IubendaProvider.
// Returns false when the trigger is missing, so callers can fall back to the link.
export function openIubendaPolicy(policy: IubendaPolicy): boolean {
  const trigger = document.getElementById(`iubenda-trigger-${policy}`)
  if (!trigger) return false
  trigger.click()
  return true
}
