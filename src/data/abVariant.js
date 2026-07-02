// =========================
// A/B入口判定
// =========================

const VALID_VARIANTS = ['b', 'b2']

const SESSION_KEYS = {
  variant: 'salon_entry_variant',
  channel: 'salon_entry_channel',
}

function isValidVariant(value) {
  return VALID_VARIANTS.includes(value)
}

function getVariantFromSearch() {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get('variant')?.toLowerCase() || null
}

function getVariantFromHash() {
  const hash = window.location.hash || ''

  if (!hash.includes('?')) return null

  const hashQuery = hash.split('?')[1] || ''
  const hashParams = new URLSearchParams(hashQuery)

  return hashParams.get('variant')?.toLowerCase() || null
}

function getChannelByVariant(variant) {
  if (variant === 'b') return 'line'
  if (variant === 'b2') return 'email'

  return 'unknown'
}

function saveEntryContext(variant) {
  if (!isValidVariant(variant)) return

  sessionStorage.setItem(SESSION_KEYS.variant, variant)
  sessionStorage.setItem(
    SESSION_KEYS.channel,
    getChannelByVariant(variant)
  )
}

export function getAbVariant() {
  const searchVariant = getVariantFromSearch()

  if (isValidVariant(searchVariant)) {
    saveEntryContext(searchVariant)
    return searchVariant
  }

  const hashVariant = getVariantFromHash()

  if (isValidVariant(hashVariant)) {
    saveEntryContext(hashVariant)
    return hashVariant
  }

  const savedVariant = sessionStorage.getItem(SESSION_KEYS.variant)

  if (isValidVariant(savedVariant)) {
    return savedVariant
  }

  return null
}

export function getEntryVariant() {
  return getAbVariant()
}

export function getEntryChannel() {
  const variant = getAbVariant()

  if (variant) {
    return getChannelByVariant(variant)
  }

  return sessionStorage.getItem(SESSION_KEYS.channel) || 'unknown'
}

export function saveEntryVariant(variant) {
  const normalizedVariant = variant?.toLowerCase()

  if (!isValidVariant(normalizedVariant)) return false

  saveEntryContext(normalizedVariant)

  return true
}

export function clearEntryContext() {
  sessionStorage.removeItem(SESSION_KEYS.variant)
  sessionStorage.removeItem(SESSION_KEYS.channel)
}

export function isKnownEntryVariant(variant) {
  return isValidVariant(variant?.toLowerCase())
}