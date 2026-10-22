import { useEffect, useMemo, useRef, useState } from 'react'
import { PRODUCTS } from '../data/products'
import { RESULT_PRODUCT_MAP } from '../data/resultMap'
import { getEntryVariant, isKnownEntryVariant } from '../data/abVariant'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import { buildResultContent } from '../utils/resultPattern'
import ResultPageV5View from './ResultPageV5View'

function normalizeProductKeys(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return [value]
  return []
}

export default function ResultPage({
  result,
  resultExpiresAt,
}) {
  // 例：P03-C（診断パターン-Q10）。レベルは別項目で計測する
  const key = `P${result.pattern}-${result.type}`
  // 写真などを入口（variant）で限定する設定があるため、入口も渡す
  const entryVariant = getEntryVariant()
  const content = useMemo(
    () => buildResultContent(result, entryVariant),
    [result, entryVariant]
  )

  // 案内先はQ10（type）だけで決める。該当がなければ A
  const productKeys = normalizeProductKeys(
    RESULT_PRODUCT_MAP[result.type] ?? RESULT_PRODUCT_MAP.A
  )

  const products = productKeys.map((k) => PRODUCTS[k]).filter(Boolean)
  const mainProduct = products[0]

  const expiredOrEnded = false
  const ctaUrl = mainProduct?.url
  const ctaLabel = mainProduct?.cta ?? '詳細を見る'

  const ctaAreaRef = useRef(null)
  const hasLoggedCtaView = useRef(false)
  const hasClickedCta = useRef(false)
  const ctaResetTimerRef = useRef(null)
  const [isCtaNavigating, setIsCtaNavigating] =
    useState(false)

  useEffect(() => {
    const resetCtaState = () => {
      hasClickedCta.current = false
      setIsCtaNavigating(false)

      if (ctaResetTimerRef.current) {
        window.clearTimeout(ctaResetTimerRef.current)
        ctaResetTimerRef.current = null
      }
    }

    window.addEventListener('pageshow', resetCtaState)

    return () => {
      window.removeEventListener('pageshow', resetCtaState)

      if (ctaResetTimerRef.current) {
        window.clearTimeout(ctaResetTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    sendTrackingEvent({
      event_type: 'result_view',
      session_id: getSessionId(),
      result_key: key,
      pattern: result.pattern,
      level: result.level,
      type: result.type,
      product_key: productKeys.join(','),
      answers: JSON.parse(
        sessionStorage.getItem('salon_diagnosis_answers') || '[]'
      ),
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
  }, [key, productKeys, result.level, result.pattern, result.type])

  useEffect(() => {
    if (!ctaAreaRef.current || !mainProduct || expiredOrEnded) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoggedCtaView.current) {
          hasLoggedCtaView.current = true

          sendTrackingEvent({
            event_type: 'cta_view',
            session_id: getSessionId(),
            result_key: key,
            pattern: result.pattern,
            level: result.level,
            type: result.type,
            product_key: productKeys.join(','),
            cta_url: ctaUrl || '',
            is_expired: expiredOrEnded,
            page_url: window.location.href,
            user_agent: navigator.userAgent,
          })
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ctaAreaRef.current)

    return () => observer.disconnect()
  }, [
    ctaUrl,
    expiredOrEnded,
    key,
    mainProduct,
    productKeys,
    result.level,
    result.pattern,
    result.type,
  ])

  const handleCtaClick = () => {
    if (!ctaUrl || hasClickedCta.current) return

    hasClickedCta.current = true
    setIsCtaNavigating(true)

    ctaResetTimerRef.current = window.setTimeout(() => {
      hasClickedCta.current = false
      setIsCtaNavigating(false)
      ctaResetTimerRef.current = null
    }, 8000)

    localStorage.setItem('diagnosis_offer_visited', 'true')

    void sendTrackingEvent({
      event_type: 'cta_click',
      session_id: getSessionId(),
      result_key: key,
      pattern: result.pattern,
      product_key: productKeys.join(','),
      cta_url: ctaUrl,
      is_expired: expiredOrEnded,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    window.setTimeout(() => {
      window.location.assign(ctaUrl)
    }, 0)
  }

const handleResetDiagnosis = () => {
  /* =========================
     現在の入口情報を先に保持
  ========================= */

  const savedVariant =
    sessionStorage.getItem('salon_entry_variant')

  const variant = isKnownEntryVariant(savedVariant)
    ? savedVariant
    : 'b'

  /* =========================
     診断データを削除
  ========================= */

  sessionStorage.removeItem('salon_diagnosis_answers')

  localStorage.removeItem('salon_diagnosis_result')
  localStorage.removeItem('salon_diagnosis_completed_at')
  localStorage.removeItem('salon_result_expires_at')
  localStorage.removeItem('salon_result_expired')
  localStorage.removeItem('salon_result_entry_variant')
  localStorage.removeItem('salon_result_entry_channel')

  /* =========================
     旧仕様の保存データも削除
  ========================= */

  localStorage.removeItem('diagnosis_answers')
  localStorage.removeItem('diagnosis_result')
  localStorage.removeItem('diagnosis_date')
  localStorage.removeItem('diagnosis_page')
  localStorage.removeItem('diagnosis_offer_visited')
  localStorage.removeItem('product_offer_deadline')
  localStorage.removeItem('consultation_offer_deadline')

  /* =========================
     確認用TOPへ戻る
  ========================= */

  window.location.assign(
    `${window.location.origin}/#/?variant=${variant}&preview=1`
  )
}

  if (!content || !mainProduct) return null

  return (
    <ResultPageV5View
      content={content}
      variant={entryVariant}
      mainProduct={mainProduct}
      ctaLabel={ctaLabel}
      ctaAreaRef={ctaAreaRef}
      handleCtaClick={handleCtaClick}
      isCtaNavigating={isCtaNavigating}
      handleResetDiagnosis={handleResetDiagnosis}
      resultExpiresAt={resultExpiresAt}
    />
  )
}
