import React from 'react'
import { useState } from 'react'
import { RESULTS } from '../data/results'
import { PRODUCTS } from '../data/products'
import { RESULT_PRODUCT_MAP } from '../data/resultMap'
import Timer from '../components/Timer'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import { isCampaignEnded } from '../utils/campaign'

const COPY = {
  INSIGHT:
    'この結果は、努力不足ではなく「見直す順番」がズレている可能性を示しています。',

  URGENCY:
    '時間が過ぎると、この診断結果に合わせた案内は確認できなくなります。',

  BRIDGE:
    'ここからは、今回の診断結果に合わせて、今のあなたに優先度が高い改善策をご案内します。',
}

const STORAGE_KEYS = {
  productDeadline: 'product_offer_deadline',
  consultationDeadline: 'consultation_offer_deadline',
}

function normalizeProductKeys(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return [value]
  return []
}

function getInitialExpired(isConsultation) {
  const storageKey = isConsultation
    ? STORAGE_KEYS.consultationDeadline
    : STORAGE_KEYS.productDeadline

  const deadline = localStorage.getItem(storageKey)

  if (!deadline) return false

  return Date.now() >= Number(deadline)
}

function getPriceText(product) {
  if (!product) return ''

  if (product.isConsultation) {
    return product.originalPrice
      ? `${product.originalPrice} → 今回無料`
      : '今回無料'
  }

  if (typeof product.price === 'number') {
    return `${product.price.toLocaleString()}円（税込）`
  }

  return product.price || ''
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

  if (!data) {
    return (
      <div className="page">
        <section className="mock-section">
          <div className="phone-card result-card">
            <h2 className="result-title">結果が見つかりません</h2>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="mock-section">
        <div className="phone-card result-card" data-result={key}>
          <div className="result-chip">あなたの現在の状態</div>

        <div className="banner">
          <img src="/images/banner-result.png" alt="診断結果のイメージ" />
        </div>

          <h2 className="result-title">
            今のままだと、方向性がズレたまま<br />
            進んでしまう状態です
          </h2>

          <div className="mini-line"></div>

          <div className="insight-box">
            <p className="insight-text">{COPY.INSIGHT}</p>
          </div>

          <div className="result-copy">
            <p>努力しているのに、</p>
            <p>予約や売上につながらない状態が続くと、</p>

            <p>何を変えればいいのか、</p>
            <p>分からなくなることがあります。</p>

            <p>多くの場合、問題は努力不足ではなく、</p>
            <p>今の状態に合った集客導線が</p>
            <p>整理できていないことにあります。</p>

            <p>今回の診断結果をもとに、</p>
            <p>あなたに合った見直しポイントを</p>
            <p>確認できます。</p>

            <p className="emphasis-text">
              自己流で続ける前に、一度現在地を整理することで、
              次に取るべき行動が見えやすくなります。
            </p>
          </div>

          {!campaignEnded && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <Timer
                  isConsultation={mainProduct?.isConsultation}
                  onExpireChange={setIsExpired}
                />
              </div>

              <div className="urgency-box">
                <p className="urgency-text">{COPY.URGENCY}</p>
              </div>
            </>
          )}

          {expiredOrEnded && (
            <div className="recommend-box">
              <p className="recommend-label">受付終了</p>

              <h3 className="recommend-title">
                この診断は終了しました
              </h3>

              <p className="recommend-text">
                最新のご案内はLINEよりお受け取りください。
              </p>
            </div>
          )}

          {!expiredOrEnded && mainProduct && (
            <>
              <div className="bridge-box">
                <p className="bridge-text">{COPY.BRIDGE}</p>
              </div>

              <div
                className="recommend-box"
                data-product={productKeys[0]}
              >
                <p className="recommend-label">
                  あなたにおすすめの次の一手
                </p>

                <h3 className="recommend-title">
                  {mainProduct.name}
                </h3>

                <p className="recommend-text">
                  {mainProduct.description ||
                    '今の状態に合わせて、必要な改善ポイントを確認できます。'}
                </p>

                <div className="recommend-points">
                  {mainProduct.isConsultation ? (
                    <>
                      <span>状態整理</span>
                      <span>導線確認</span>
                      <span>改善提案</span>
                    </>
                  ) : (
                    <>
                      <span>集客改善</span>
                      <span>導線整理</span>
                      <span>実践サポート</span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {!expiredOrEnded && mainProduct && (
            <>
              <p className="pre-cta-text">
                無理な提案は一切ありません。<br />
                今の状態を整理するだけでも大丈夫です。
              </p>

              <button
                type="button"
                className="cta-button"
                onClick={handleCtaClick}
              >
                {ctaLabel}
              </button>

              <p className="note-text">
                {mainProduct.isConsultation
                  ? '※その場で終了OK'
                  : '※クレジットカード払いのみ'}
              </p>

              <p className="price-note">
                {getPriceText(mainProduct)}
              </p>
            </>
          )}

          {expiredOrEnded && (
            <>
              <button
                type="button"
                className="cta-button"
                onClick={handleCtaClick}
              >
                {ctaLabel}
              </button>

              <p className="note-text">
                ※LINEで最新のご案内を受け取れます
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}