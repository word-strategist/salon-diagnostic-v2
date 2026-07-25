// =========================
// A/B入口判定
// =========================

const VALID_VARIANTS = ['b', 'b2']

const SESSION_KEYS = {
  variant: 'salon_entry_variant',
  channel: 'salon_entry_channel',
  utmSource: 'salon_utm_source',
  utmMedium: 'salon_utm_medium',
  utmCampaign: 'salon_utm_campaign',
  utmContent: 'salon_utm_content',
}

function isValidVariant(value) {
  return VALID_VARIANTS.includes(value)
}

function normalizeValue(value) {
  return value?.trim().toLowerCase() || null
}

// =========================
// URLパラメータ取得
// =========================

function getSearchParams() {
  return new URLSearchParams(window.location.search)
}

function getHashParams() {
  const hash = window.location.hash || ''

  if (!hash.includes('?')) {
    return new URLSearchParams()
  }

  const hashQuery = hash.split('?')[1] || ''

  return new URLSearchParams(hashQuery)
}

function getUrlParam(name) {
  const searchValue = getSearchParams().get(name)

  if (searchValue) {
    return searchValue
  }

  return getHashParams().get(name)
}

function getVariantFromUrl() {
  return normalizeValue(getUrlParam('variant'))
}

// =========================
// 旧配信との互換用
// =========================

function getLegacyChannelByVariant(variant) {
  if (variant === 'b') return 'line'
  if (variant === 'b2') return 'email'

  return 'unknown'
}

// =========================
// 流入情報保存
// =========================

function saveOptionalSessionValue(key, value) {
  if (!value) return

  sessionStorage.setItem(key, value)
}

function saveEntryContext(variant) {
  if (!isValidVariant(variant)) return

  const savedVariant = sessionStorage.getItem(
    SESSION_KEYS.variant
  )

  const utmSource = normalizeValue(
    getUrlParam('utm_source')
  )

  const utmMedium = normalizeValue(
    getUrlParam('utm_medium')
  )

  const utmCampaign = normalizeValue(
    getUrlParam('utm_campaign')
  )

  const utmContent = normalizeValue(
    getUrlParam('utm_content')
  )

  const explicitChannel = normalizeValue(
    getUrlParam('channel')
  )

  sessionStorage.setItem(
    SESSION_KEYS.variant,
    variant
  )

  saveOptionalSessionValue(
    SESSION_KEYS.utmSource,
    utmSource
  )

  saveOptionalSessionValue(
    SESSION_KEYS.utmMedium,
    utmMedium
  )

  saveOptionalSessionValue(
    SESSION_KEYS.utmCampaign,
    utmCampaign
  )

  saveOptionalSessionValue(
    SESSION_KEYS.utmContent,
    utmContent
  )

  if (utmSource || explicitChannel) {
    sessionStorage.setItem(
      SESSION_KEYS.channel,
      utmSource || explicitChannel
    )
    return
  }

  const savedChannel = sessionStorage.getItem(
    SESSION_KEYS.channel
  )

  if (savedVariant === variant && savedChannel) {
    return
  }

  sessionStorage.setItem(
    SESSION_KEYS.channel,
    getLegacyChannelByVariant(variant)
  )
}

// =========================
// 公開関数
// =========================

export function getAbVariant() {
  const urlVariant = getVariantFromUrl()

  if (isValidVariant(urlVariant)) {
    saveEntryContext(urlVariant)
    return urlVariant
  }

  const savedVariant = sessionStorage.getItem(
    SESSION_KEYS.variant
  )

  if (isValidVariant(savedVariant)) {
    return savedVariant
  }

  return null
}

export function getEntryVariant() {
  return getAbVariant()
}

export function getEntryChannel() {
  getAbVariant()

  return (
    sessionStorage.getItem(SESSION_KEYS.channel) ||
    'unknown'
  )
}

export function getEntryUtmData() {
  getAbVariant()

  return {
    utm_source:
      sessionStorage.getItem(SESSION_KEYS.utmSource) || '',
    utm_medium:
      sessionStorage.getItem(SESSION_KEYS.utmMedium) || '',
    utm_campaign:
      sessionStorage.getItem(SESSION_KEYS.utmCampaign) || '',
    utm_content:
      sessionStorage.getItem(SESSION_KEYS.utmContent) || '',
  }
}

export function saveEntryVariant(variant) {
  const normalizedVariant = normalizeValue(variant)

  if (!isValidVariant(normalizedVariant)) {
    return false
  }

  saveEntryContext(normalizedVariant)

  return true
}

export function clearEntryContext() {
  Object.values(SESSION_KEYS).forEach((key) => {
    sessionStorage.removeItem(key)
  })
}

export function isKnownEntryVariant(variant) {
  return isValidVariant(normalizeValue(variant))
}
