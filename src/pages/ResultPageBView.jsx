import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import { getResultRemainingMs } from '../utils/campaign'
import './ResultPageBView.css'

const RESULT_LABELS = {
  A: '発信整理タイプ',
  B: 'HPB見直しタイプ',
  C: '相談整理タイプ',
  D: '時短仕組み化タイプ',
}

const LEVEL_LABELS = {
  1: 'まず整える段階',
  2: '伸ばす準備段階',
  3: '次のステージ段階',
}

/* =========================
   残り時間表示
========================= */

function formatRemainingTime(remainingMs) {
  const totalMinutes = Math.max(
    0,
    Math.ceil(remainingMs / (60 * 1000))
  )

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return {
    hours,
    minutes,
  }
}

/* =========================
   プレビューモード判定
========================= */

function isPreviewEnabled() {
  if (!import.meta.env.DEV) {
    return false
  }

  const searchParams = new URLSearchParams(
    window.location.search
  )

  const hash = window.location.hash || ''
  const hashQuery = hash.includes('?')
    ? hash.split('?')[1]
    : ''

  const hashParams = new URLSearchParams(hashQuery)

  return (
    searchParams.get('preview') === '1' ||
    hashParams.get('preview') === '1'
  )
}

export default function ResultPageBView({
  resultKey,
  copy,
  mainProduct,
  expiredOrEnded,
  ctaLabel,
  ctaAreaRef,
  handleCtaClick,
  handleResetDiagnosis,
  COMMON_COPY,
  resultExpiresAt,
}) {
  const [now, setNow] = useState(Date.now())

  const [level, type] = resultKey.split('-')

  const typeLabel =
    RESULT_LABELS[type] || '整理タイプ'

  const levelLabel =
    LEVEL_LABELS[level] || '現在地確認'

  const previewEnabled = isPreviewEnabled()

  /* =========================
     Result期限タイマー
  ========================= */

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => {
      window.clearInterval(timerId)
    }
  }, [])

  const remainingMs = useMemo(
    () => getResultRemainingMs(resultExpiresAt, now),
    [resultExpiresAt, now]
  )

  const remainingTime = useMemo(
    () => formatRemainingTime(remainingMs),
    [remainingMs]
  )

  return (
    <div className="result-b-page">
      <main className="result-b-phone">
        <section className="result-b-card">
          {/* =========================
              Progress
          ========================= */}

          <div className="result-b-progress">
            <div className="result-b-progress-label">
              <span>Salon Check</span>
              <strong>診断結果</strong>
            </div>

            <div className="result-b-progress-bar">
              <span />
            </div>
          </div>

          {/* =========================
              Result Deadline
          ========================= */}

          <section className="result-b-deadline">
            <p className="result-b-deadline-label">
              この診断結果を見られるのは
            </p>

            <p className="result-b-deadline-time">
              あと
              <strong>
                {remainingTime.hours}
              </strong>
              時間
              <strong>
                {remainingTime.minutes}
              </strong>
              分
            </p>

            <p className="result-b-deadline-note">
              ※診断完了から24時間限定
            </p>
          </section>

          {/* =========================
              Result Hero
          ========================= */}

          <section className="result-b-hero">
            <p className="result-b-kicker">
              診断おつかれさまでした！
              <br />
              あなたのタイプはこちら
            </p>

            <div className="result-b-type-box">
              <span>TYPE</span>
              <strong>{type}</strong>
            </div>

            <h1>{typeLabel}</h1>

            <p className="result-b-level">
              {levelLabel}
            </p>

            <div
              className="result-b-visual-slot"
              aria-label="診断タイプ画像の予定位置"
            />
          </section>

          {/* =========================
              Current Cause
          ========================= */}

          <section className="result-b-info-card">
            <div className="result-b-icon">
              ○
            </div>

            <div>
              <h2>
                今のあなたに起きていること
              </h2>

              <p>{copy.CAUSE}</p>
            </div>
          </section>

          {/* =========================
              Solution
          ========================= */}

          <section className="result-b-info-card">
            <div className="result-b-icon">
              ♡
            </div>

            <div>
              <h2>
                ここから整えていくこと
              </h2>

              <p>{copy.SOLUTION}</p>
            </div>
          </section>

          {/* =========================
              Urgency
          ========================= */}

          <section className="result-b-info-card">
            <div className="result-b-icon">
              !
            </div>

            <div>
              <h2>
                今、取り組んでおきたい理由
              </h2>

              <p>{copy.URGENCY}</p>
            </div>
          </section>

          {/* =========================
              Expired
          ========================= */}

          {expiredOrEnded && (
            <section className="result-b-expired">
              <p>
                {COMMON_COPY.EXPIRED_LABEL}
              </p>

              <h2>
                {COMMON_COPY.EXPIRED_TITLE}
              </h2>

              <p>
                {COMMON_COPY.EXPIRED_TEXT}
              </p>
            </section>
          )}

          {/* =========================
              Product Offer
          ========================= */}

          {!expiredOrEnded && mainProduct && (
            <section
              className="result-b-offer"
              ref={ctaAreaRef}
            >
              <div className="result-b-card-heading">
                <div className="result-b-icon">
                  ◇
                </div>

                <h2>
                  診断者限定のご案内があります
                </h2>
              </div>

              <p className="result-b-offer-copy">
                {copy.PRE_CTA}
              </p>

              <div className="result-b-product-box">
                <span>
                  あなたに合った次の一歩
                </span>

                <strong>
                  {mainProduct.name}
                </strong>

                <p>
                  {mainProduct.description}
                </p>
              </div>

              <button
                type="button"
                className="result-b-cta"
                onClick={handleCtaClick}
              >
                {ctaLabel}
                <span>›</span>
              </button>

              <p className="result-b-note">
                ※画像・イラストは後でまとめて差し替えます
              </p>
            </section>
          )}

          {/* =========================
              Preview Reset
          ========================= */}

          {previewEnabled && (
            <button
              type="button"
              className="result-b-reset"
              onClick={handleResetDiagnosis}
            >
              もう一度診断する（確認用）
            </button>
          )}

          {/* =========================
              Footer
          ========================= */}

          <Footer />
        </section>
      </main>
    </div>
  )
}