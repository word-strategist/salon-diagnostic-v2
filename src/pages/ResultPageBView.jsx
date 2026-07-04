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

const RESULT_IMAGES = {
  template: '/images/result/ResultTemplate_v1_2026-07-04.png',
  intro: '/images/result/Result診断説明人物_v1_2026-07-04.png',
  future: '/images/result/Result未来人物_v1_2026-07-04.png',
  voiceA: '/images/result/ResultVoice人物_A_v1_2026-07-04.png',
  voiceB: '/images/result/ResultVoice人物_B_v1_2026-07-04.png',
}

function formatRemainingTime(remainingMs) {
  const totalMinutes = Math.max(0, Math.ceil(remainingMs / (60 * 1000)))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hours, minutes }
}

function isPreviewEnabled() {
  if (!import.meta.env.DEV) return false

  const searchParams = new URLSearchParams(window.location.search)
  const hash = window.location.hash || ''
  const hashQuery = hash.includes('?') ? hash.split('?')[1] : ''
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
  const typeLabel = RESULT_LABELS[type] || '整理タイプ'
  const levelLabel = LEVEL_LABELS[level] || '現在地確認'
  const previewEnabled = isPreviewEnabled()

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
          <div className="result-b-progress">
            <div className="result-b-progress-label">
              <span>Salon Check</span>
              <strong>診断結果</strong>
            </div>

            <div className="result-b-progress-bar">
              <span />
            </div>
          </div>

          <section className="result-b-deadline">
            <p className="result-b-deadline-label">
              この診断結果を見られるのは
            </p>

            <p className="result-b-deadline-time">
              あと
              <strong>{remainingTime.hours}</strong>
              時間
              <strong>{remainingTime.minutes}</strong>
              分
            </p>

            <p className="result-b-deadline-note">
              ※診断完了から24時間限定
            </p>
          </section>

          <section className="result-b-hero">
            <p className="result-b-kicker">
              診断おつかれさまでした。
              <br />
              あなたの今のタイプはこちらです。
            </p>

            <div className="result-b-type-box">
              <span>TYPE</span>
              <strong>{type}</strong>
            </div>

            <h1>{typeLabel}</h1>

            <p className="result-b-level">
              {levelLabel}
            </p>

            <div className="result-b-hero-image">
              <img
                src={RESULT_IMAGES.template}
                alt=""
                loading="eager"
              />
            </div>
          </section>

          <section className="result-b-lead-card">
            <div className="result-b-lead-image">
              <img
                src={RESULT_IMAGES.intro}
                alt=""
                loading="lazy"
              />
            </div>

            <div>
              <p className="result-b-section-label">
                診断で分かること
              </p>

              <h2>
                今の集客がうまくいかない理由は、
                努力不足ではなく「整える順番」にあります。
              </h2>

              <p>
                この診断では、あなたのサロンが今どの段階にいて、
                どこを整えると次の一歩につながりやすいのかを見ていきます。
              </p>
            </div>
          </section>

          <section className="result-b-info-card">
            <div className="result-b-icon">○</div>

            <div>
              <h2>今のあなたに起きていること</h2>
              <p>{copy.CAUSE}</p>
            </div>
          </section>

          <section className="result-b-info-card">
            <div className="result-b-icon">♡</div>

            <div>
              <h2>ここから整えていくこと</h2>
              <p>{copy.SOLUTION}</p>
            </div>
          </section>

          <section className="result-b-future-card">
            <div>
              <p className="result-b-section-label">
                診断後の未来
              </p>

              <h2>
                整える場所が分かると、
                迷いながら発信する時間が少しずつ減っていきます。
              </h2>

              <p>
                何を直せばいいか分からない状態から、
                今やることが見える状態へ。
                その一歩をつくるための診断結果です。
              </p>
            </div>

            <div className="result-b-future-image">
              <img
                src={RESULT_IMAGES.future}
                alt=""
                loading="lazy"
              />
            </div>
          </section>

          <section className="result-b-info-card">
            <div className="result-b-icon">!</div>

            <div>
              <h2>今、取り組んでおきたい理由</h2>
              <p>{copy.URGENCY}</p>
            </div>
          </section>

          <section className="result-b-voice-grid">
            <div className="result-b-voice-card">
              <img
                src={RESULT_IMAGES.voiceA}
                alt=""
                loading="lazy"
              />
              <p>
                「何となく頑張る」から、
                「ここを整える」に変えていく。
              </p>
            </div>

            <div className="result-b-voice-card">
              <img
                src={RESULT_IMAGES.voiceB}
                alt=""
                loading="lazy"
              />
              <p>
                小さな見直しが、
                予約につながる導線を整えていきます。
              </p>
            </div>
          </section>

          {expiredOrEnded && (
            <section className="result-b-expired">
              <p>{COMMON_COPY.EXPIRED_LABEL}</p>
              <h2>{COMMON_COPY.EXPIRED_TITLE}</h2>
              <p>{COMMON_COPY.EXPIRED_TEXT}</p>
            </section>
          )}

          {!expiredOrEnded && mainProduct && (
            <section
              className="result-b-offer"
              ref={ctaAreaRef}
            >
              <div className="result-b-card-heading">
                <div className="result-b-icon">◇</div>

                <h2>
                  診断者限定のご案内があります
                </h2>
              </div>

              <p className="result-b-offer-copy">
                {copy.PRE_CTA}
              </p>

              <div className="result-b-product-box">
                <span>あなたに合った次の一歩</span>

                <strong>{mainProduct.name}</strong>

                <p>{mainProduct.description}</p>
              </div>

              <button
                type="button"
                className="result-b-cta"
                onClick={handleCtaClick}
              >
                {ctaLabel}
                <span>›</span>
              </button>
            </section>
          )}

          {previewEnabled && (
            <button
              type="button"
              className="result-b-reset"
              onClick={handleResetDiagnosis}
            >
              もう一度診断する（確認用）
            </button>
          )}

          <Footer />
        </section>
      </main>
    </div>
  )
}