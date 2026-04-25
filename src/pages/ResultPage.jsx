import React from 'react'
import { useState } from 'react'
import { RESULTS, getBanner } from '../data/results'
import { PRODUCTS } from '../data/products'
import { RESULT_PRODUCT_MAP } from '../data/resultMap'
import Footer from '../components/Footer'
import Timer from '../components/Timer'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import { isCampaignEnded } from '../utils/campaign'

const COLORS = {
  gold: '#d4af37',
  navy: '#1a1f3a',
  white: '#ffffff',
  red: '#ff2d2d',
  green: '#16a34a',
  muted: 'rgba(255,255,255,0.6)',
}

const STORAGE_KEYS = {
  productDeadline: 'product_offer_deadline',
  consultationDeadline: 'consultation_offer_deadline',
}

function splitHtmlContent(html = '') {
  const markers = [
    '<h3 style="color:#d4af37;font-size:22px;font-weight:bold;margin-bottom:20px">この教材で得られること</h3>',
    '<h3 style="color:#d4af37;font-size:22px;font-weight:bold;margin-bottom:20px">この相談で得られること</h3>',
  ]

  for (const marker of markers) {
    const index = html.indexOf(marker)
    if (index !== -1) {
      return {
        beforeHtml: html.slice(0, index),
        afterHtml: html.slice(index),
      }
    }
  }

  return {
    beforeHtml: html,
    afterHtml: '',
  }
}

function getInitialExpired(isConsultation) {
  const storageKey = isConsultation
    ? STORAGE_KEYS.consultationDeadline
    : STORAGE_KEYS.productDeadline

  const deadline = localStorage.getItem(storageKey)

  if (!deadline) return false

  return Date.now() >= Number(deadline)
}

function normalizeProductKeys(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return [value]
  return []
}

export default function ResultPage({ result }) {
  const key = `${result.level}-${result.type}`
  const data = RESULTS[key] ?? RESULTS['1-A']

  const productKeys = normalizeProductKeys(
    RESULT_PRODUCT_MAP[key] ?? RESULT_PRODUCT_MAP['1-A']
  )

  const products = productKeys
    .map((productKey) => PRODUCTS[productKey])
    .filter(Boolean)

  const mainProduct = products[0]

  const campaignEnded = isCampaignEnded()

  const [isExpired, setIsExpired] = useState(() =>
    getInitialExpired(mainProduct?.isConsultation)
  )

  const expiredOrEnded = isExpired || campaignEnded
  const expiredRedirectUrl = 'https://sendenhi-zero.com/line'

  const ctaUrl = expiredOrEnded ? expiredRedirectUrl : mainProduct?.url
  const ctaLabel = expiredOrEnded
    ? 'LINE登録してご案内を受け取る'
    : mainProduct?.cta ?? '詳細を見る'

  if (!data) {
    return (
      <div style={{ color: 'white', padding: '40px', textAlign: 'center' }}>
        結果が見つかりません
      </div>
    )
  }

  const bannerUrl = getBanner(data.level)
  const { beforeHtml, afterHtml } = splitHtmlContent(data.html)

  const handleCtaClick = async () => {
    localStorage.setItem('diagnosis_offer_visited', 'true')

    const sessionId = getSessionId()
    const resultKey = `${result.level}-${result.type}`
    const currentProductKeys = normalizeProductKeys(
      RESULT_PRODUCT_MAP[resultKey] ?? []
    )

    await sendTrackingEvent({
      event_type: 'cta_click',
      session_id: sessionId,
      result_key: resultKey,
      level: result.level,
      type: result.type,
      product_key: currentProductKeys.join(','),
      cta_url: ctaUrl || '',
      is_expired: expiredOrEnded,
      offer_type: expiredOrEnded
        ? 'line_redirect'
        : mainProduct?.isConsultation
          ? 'consultation'
          : 'product',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    if (ctaUrl) {
      window.location.href = ctaUrl
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1f3a 0%, #2d3561 100%)',
        fontFamily: 'sans-serif',
        color: COLORS.white,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 0 40px',
          boxSizing: 'border-box',
        }}
      >
        {bannerUrl && (
          <div style={{ padding: '24px 24px 0' }}>
            <img
              src={bannerUrl}
              alt="診断結果バナー"
              style={{
                width: '100%',
                borderRadius: '20px',
                display: 'block',
              }}
            />
          </div>
        )}

        <div style={{ padding: '24px 24px 0' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '24px',
              padding: '24px',
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: beforeHtml }}
              style={{ lineHeight: 1.8 }}
            />
          </div>
        </div>

        {!campaignEnded && (
          <div style={{ padding: '24px 24px 0' }}>
            <Timer
              isConsultation={mainProduct?.isConsultation}
              onExpireChange={setIsExpired}
            />
          </div>
        )}

        {expiredOrEnded && (
          <div style={{ padding: '0 24px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: COLORS.white,
                  fontSize: 'clamp(16px, 3.5vw, 18px)',
                  fontWeight: 'bold',
                  margin: 0,
                  lineHeight: '1.7',
                }}
              >
                この診断は終了しました
              </p>

              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 'clamp(13px, 3vw, 15px)',
                  lineHeight: '1.8',
                  margin: '10px 0 0',
                }}
              >
                最新のご案内はLINEよりお受け取りください。
              </p>
            </div>
          </div>
        )}

        {afterHtml && !expiredOrEnded && (
          <div style={{ padding: '24px 24px 0' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '24px',
                padding: '24px',
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: afterHtml }}
                style={{ lineHeight: 1.8 }}
              />
            </div>
          </div>
        )}

        {!expiredOrEnded &&
          products.map((product, index) => {
            if (product.isConsultation) return null

            const priceText = product.price || ''
            const mainPrice = priceText.replace('（税込）', '')
            const taxNote = priceText.includes('（税込）') ? '税込' : ''

            return (
              <div key={`${product.name}-${index}`} style={{ padding: '24px 24px 0' }}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '24px',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  {product.originalPrice && (
                    <div
                      style={{
                        color: COLORS.muted,
                        fontSize: '15px',
                        textDecoration: 'line-through',
                        marginBottom: '10px',
                      }}
                    >
                      通常価格：
                      {product.billingLabel
                        ? `${product.billingLabel}${product.originalPrice}`
                        : product.originalPrice}
                    </div>
                  )}

                  {product.priceLabel && (
                    <div
                      style={{
                        color: COLORS.gold,
                        fontSize: '15px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {product.priceLabel}
                    </div>
                  )}

                  <div
                    style={{
                      color: COLORS.red,
                      fontWeight: 'bold',
                      lineHeight: 1.2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'clamp(16px, 3vw, 20px)',
                        marginRight: '4px',
                      }}
                    >
                      {product.billingLabel}
                    </span>

                    <span
                      style={{
                        fontSize: 'clamp(28px, 6vw, 36px)',
                      }}
                    >
                      {mainPrice}
                    </span>

                    {taxNote && (
                      <span
                        style={{
                          fontSize: 'clamp(14px, 3vw, 18px)',
                          marginLeft: '2px',
                        }}
                      >
                        （{taxNote}）
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

        <div style={{ textAlign: 'center', padding: '24px' }}>
          <button
            onClick={handleCtaClick}
            style={{
              background: expiredOrEnded ? COLORS.gold : COLORS.green,
              color: expiredOrEnded ? COLORS.navy : COLORS.white,
              border: 'none',
              borderRadius: '50px',
              padding: '22px 40px',
              fontSize: 'clamp(15px, 3.5vw, 18px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: expiredOrEnded
                ? '0 6px 24px rgba(212,175,55,0.35)'
                : '0 6px 24px rgba(22,163,74,0.45)',
              width: '100%',
              maxWidth: '480px',
            }}
          >
            {ctaLabel}
          </button>

          {!expiredOrEnded && !mainProduct?.isConsultation && (
            <div
              style={{
                color: COLORS.muted,
                fontSize: '13px',
                marginTop: '8px',
              }}
            >
              ※クレジットカード払いのみ
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}