import {
  getEntryChannel,
  getEntryUtmData,
  getEntryVariant,
} from '../data/abVariant'

// =========================
// GAS送信先
// =========================

const GAS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzD7rtjeZNrrgxfVO6qetW9ZaHPajaNiI1KJy-uxtSPxAuJsTlH8uI4kzm8a8UIfKhtqA/exec'

// =========================
// セッション管理
// =========================

const SESSION_ID_KEY = 'salon_diag_session_id'

function createSessionId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return `sess_${crypto.randomUUID()}`
  }

  return `sess_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)}`
}

export function getSessionId() {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY)

  if (!sessionId) {
    sessionId = createSessionId()
    sessionStorage.setItem(SESSION_ID_KEY, sessionId)
  }

  return sessionId
}

export function resetSessionId() {
  sessionStorage.removeItem(SESSION_ID_KEY)
}

// =========================
// 共通計測情報
// =========================

function getCommonTrackingData() {
  return {
    session_id: getSessionId(),
    variant: getEntryVariant() || 'unknown',
    channel: getEntryChannel(),
    ...getEntryUtmData(),
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    tracked_at: new Date().toISOString(),
  }
}

// =========================
// 試用アクセス（preview=1）の判定
// index.html で一度判定した結果を優先し、念のためURL・タブ内の記録も確認する
// =========================

const PREVIEW_ACCESS_KEY = 'salon_preview_access'

function isPreviewAccess() {
  if (window.__SALON_PREVIEW__ === true) return true

  const url = window.location.search + window.location.hash
  if (/[?&]preview=1(?:[&#]|$)/.test(url)) return true

  try {
    return sessionStorage.getItem(PREVIEW_ACCESS_KEY) === '1'
  } catch {
    return false
  }
}

// =========================
// GASイベント送信
// =========================

export async function sendTrackingEvent(payload = {}) {
  try {
    const trackingPayload = {
      ...getCommonTrackingData(),
      ...payload,
    }

    console.log('tracking payload:', trackingPayload)

    // ローカル開発では本番GASへ送信しない
    if (import.meta.env.DEV) {
      return { ok: true, skipped: 'dev' }
    }

    // 試用アクセス（preview=1）は本番LPログへ送信しない
    if (isPreviewAccess()) {
      return { ok: true, skipped: 'preview' }
    }

    const response = await fetch(GAS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(trackingPayload),
      keepalive: true,
    })

    const text = await response.text()

    console.log('tracking response status:', response.status)
    console.log('tracking response body:', text)

    try {
      return JSON.parse(text)
    } catch {
      return {
        ok: response.ok,
        message: 'response is not json',
        raw: text,
      }
    }
  } catch (error) {
    console.error('tracking error:', error)

    return {
      ok: false,
      message: error instanceof Error
        ? error.message
        : 'unknown tracking error',
    }
  }
}