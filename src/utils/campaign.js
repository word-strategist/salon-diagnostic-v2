// =========================
// キャンペーン期間設定
// =========================

export const CAMPAIGN_START_AT =
  '2026-07-07T08:00:00+09:00'

export const CAMPAIGN_END_AT =
  '2026-07-08T23:59:59+09:00'

// =========================
// 結果閲覧期限
// =========================

export const RESULT_VIEW_DURATION_MS =
  24 * 60 * 60 * 1000

// =========================
// 日時変換
// =========================

function toTimestamp(value) {
  const timestamp = new Date(value).getTime()

  return Number.isNaN(timestamp) ? null : timestamp
}

// =========================
// キャンペーン状態
// =========================

export function getCampaignStatus(now = Date.now()) {
  const start = toTimestamp(CAMPAIGN_START_AT)
  const end = toTimestamp(CAMPAIGN_END_AT)

  if (start === null || end === null) {
    return 'ended'
  }

  if (now < start) {
    return 'before'
  }

  if (now > end) {
    return 'ended'
  }

  return 'active'
}

export function isCampaignBefore(now = Date.now()) {
  return getCampaignStatus(now) === 'before'
}

export function isCampaignActive(now = Date.now()) {
  return getCampaignStatus(now) === 'active'
}

export function isCampaignEnded(now = Date.now()) {
  return getCampaignStatus(now) === 'ended'
}

export function shouldShowTopTimer(now = Date.now()) {
  return isCampaignActive(now)
}

// =========================
// 結果閲覧期限生成
// =========================

export function createResultExpiry(
  completedAt = new Date().toISOString()
) {
  const completedTimestamp = toTimestamp(completedAt)

  if (completedTimestamp === null) {
    return null
  }

  return new Date(
    completedTimestamp + RESULT_VIEW_DURATION_MS
  ).toISOString()
}

// =========================
// 結果閲覧期限判定
// =========================

export function isResultExpired(
  expiresAt,
  now = Date.now()
) {
  const expiresTimestamp = toTimestamp(expiresAt)

  if (expiresTimestamp === null) {
    return true
  }

  return now >= expiresTimestamp
}

export function getResultRemainingMs(
  expiresAt,
  now = Date.now()
) {
  const expiresTimestamp = toTimestamp(expiresAt)

  if (expiresTimestamp === null) {
    return 0
  }

  return Math.max(0, expiresTimestamp - now)
}