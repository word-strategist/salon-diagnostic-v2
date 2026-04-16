// ===============================
// 【MTGデモ用設定】
// 本番テスト終了後のため、ローカル確認用に期間を一時延長
// ※本番デプロイ前に必ず TEST_MODE = false に戻すこと
// ===============================

const TEST_MODE = true

const TEST_CAMPAIGN_START_AT = '2026-04-01T00:00:00+09:00'
const TEST_CAMPAIGN_END_AT = '2026-04-30T23:59:59+09:00'

export const CAMPAIGN_START_AT = TEST_MODE
  ? TEST_CAMPAIGN_START_AT
  : '2026-04-07T20:00:00+09:00'

export const CAMPAIGN_END_AT = TEST_MODE
  ? TEST_CAMPAIGN_END_AT
  : '2026-04-09T23:59:59+09:00'

export function isCampaignEnded() {
  const now = Date.now()
  const end = new Date(CAMPAIGN_END_AT).getTime()
  return now > end
}

export function shouldShowTopTimer() {
  const now = Date.now()
  const start = new Date(CAMPAIGN_START_AT).getTime()
  const end = new Date(CAMPAIGN_END_AT).getTime()

  return now >= start && now <= end
}