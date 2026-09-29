import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import { getResultRemainingMs } from '../utils/campaign'
import { PATTERN_COPY_IS_DRAFT } from '../data/patternCopy'
import './ResultPageV5View.css'

/* =========================
   第5回 結果ページ
   ホルダー提供「予約力診断」の型に沿った5区画
   ①診断結果 ②改善ポイント3つ ③最優先事項と理由
   ④改善によって期待できること ⑤商品・相談会案内
   レベル・ランク・点数・動画・人数限定表記は表示しない
========================= */

function formatRemainingTime(remainingMs) {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000))

  return {
    hours: String(Math.floor(totalSeconds / 3600)).padStart(2, '0'),
    minutes: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'),
    seconds: String(totalSeconds % 60).padStart(2, '0'),
  }
}

function getHashParams() {
  const hash = window.location.hash || ''
  return new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '')
}

function isPreviewEnabled() {
  if (!import.meta.env.DEV) return false

  return (
    new URLSearchParams(window.location.search).get('preview') === '1' ||
    getHashParams().get('preview') === '1'
  )
}

/* =========================
   開発確認用：6パターンの代表回答とQ10切替
========================= */

const PREVIEW_EXAMPLES = [
  { label: '01', answers: '0,0,2,0,0,2,0,0,0,0' },
  { label: '02', answers: '2,4,1,1,1,0,0,1,1,1' },
  { label: '03', answers: '1,2,0,0,1,0,0,1,1,2' },
  { label: '04 準備', answers: '1,1,2,2,0,1,0,0,0,3' },
  { label: '04 見直し', answers: '1,2,2,1,0,1,0,0,0,0' },
  { label: '05', answers: '1,2,0,0,1,2,0,1,1,0' },
  { label: '06', answers: '2,4,2,0,2,2,0,2,2,3' },
]

function openPreview(answers) {
  const variant =
    sessionStorage.getItem('salon_entry_variant') || 'b5a'

  // ハッシュだけの変更では再読み込みされないため、明示的に読み込み直す
  window.location.hash =
    `#/?variant=${variant}&preview=1&answers=${answers}`
  window.location.reload()
}

function PreviewPanel({ handleResetDiagnosis }) {
  const currentAnswers = (() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem('salon_diagnosis_answers') || '[]'
      )
      return Array.isArray(saved) && saved.length === 10 ? saved : null
    } catch {
      return null
    }
  })()

  return (
    <section className="result-v5-preview">
      <p className="result-v5-preview-title">確認用（開発時のみ表示）</p>

      {currentAnswers && (
        <p className="result-v5-preview-answers">
          回答：{currentAnswers.join(', ')}
        </p>
      )}

      <p className="result-v5-preview-label">パターン代表例</p>
      <div className="result-v5-preview-links">
        {PREVIEW_EXAMPLES.map((example) => (
          <button
            key={example.label}
            type="button"
            onClick={() => openPreview(example.answers)}
          >
            {example.label}
          </button>
        ))}
      </div>

      {currentAnswers && (
        <>
          <p className="result-v5-preview-label">
            同じ回答でQ10だけ変更
          </p>
          <div className="result-v5-preview-links">
            {[0, 1, 2, 3].map((q10) => (
              <button
                key={q10}
                type="button"
                onClick={() =>
                  openPreview(
                    [...currentAnswers.slice(0, 9), q10].join(',')
                  )
                }
              >
                Q10={q10}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        type="button"
        className="result-v5-preview-reset"
        onClick={handleResetDiagnosis}
      >
        もう一度診断する（確認用）
      </button>
    </section>
  )
}

export default function ResultPageV5View({
  content,
  mainProduct,
  ctaLabel,
  ctaAreaRef,
  handleCtaClick,
  isCtaNavigating,
  handleResetDiagnosis,
  resultExpiresAt,
}) {
  const [now, setNow] = useState(() => Date.now())
  const [previewEnabled] = useState(isPreviewEnabled)

  useEffect(() => {
    const timerId = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timerId)
  }, [])

  const remainingTime = useMemo(
    () => formatRemainingTime(getResultRemainingMs(resultExpiresAt, now)),
    [resultExpiresAt, now]
  )

  return (
    <div className="result-v5-page">
      <main className="result-v5-phone">
        <div className="result-v5-card">
          {previewEnabled && PATTERN_COPY_IS_DRAFT && (
            <p className="result-v5-draft-badge">
              仮文言：結果文言・案内文は確認用です
            </p>
          )}

          {/* ① 診断結果 */}
          <section className="result-v5-summary">
            <div className="result-v5-badge" aria-hidden="true">
              <strong>{content.pattern}</strong>
              <span>タイプ</span>
            </div>

            <p className="result-v5-kicker">あなたの診断結果</p>
            <h1 className="result-v5-name">{content.name}</h1>

            <div className="result-v5-lead-box">
              {content.lead && <p>{content.lead}</p>}

              <dl className="result-v5-facts">
                {content.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* ② 改善ポイント3つ */}
          <section className="result-v5-points">
            <h2 className="result-v5-section-title result-v5-points-title">
              あなたが今すぐ見直したいポイント
            </h2>

            <ol>
              {content.points.map((point, index) => (
                <li key={point?.title ?? index}>
                  <span className="result-v5-point-mark" aria-hidden="true">
                    !
                  </span>
                  <div>
                    <strong>{point?.title}</strong>
                    <p>{point?.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ③ 最優先事項と理由 */}
          <section className="result-v5-priority">
            <p className="result-v5-priority-label">
              あなたが“最優先で”取り組みたいことは
            </p>
            <p className="result-v5-priority-title">
              「{content.priority?.title}」
            </p>
            <p className="result-v5-priority-reason">
              <span>理由</span>
              {content.priority?.reason}
            </p>
          </section>

          {/* ④ 改善によって期待できること */}
          <section className="result-v5-outcome">
            <h2 className="result-v5-section-title">
              <span aria-hidden="true">✨</span>
              改善によって期待できること
            </h2>
            <p>{content.outcome}</p>
          </section>

          {/* ⑤ 商品・相談会案内 */}
          <section className="result-v5-offer">
            <p className="result-v5-offer-label">あなたへのご案内</p>

            <p className="result-v5-offer-bridge">
              「今のサロンに最も必要なもの」として選ばれた
              <strong>「{content.wishText}」</strong>
              に合わせたご案内です。
            </p>

            <div className="result-v5-product">
              <strong>{mainProduct.name}</strong>
              {mainProduct.description && <p>{mainProduct.description}</p>}
            </div>

            {/* 閲覧期限（診断完了から24時間）：商品名とCTAの間に表示 */}
            <section
              className="result-v5-deadline"
              aria-label="診断結果の閲覧期限"
            >
              <p className="result-v5-deadline-label">
                診断結果の閲覧期限まで残り
              </p>

              <div className="result-v5-deadline-boxes">
                {[
                  [remainingTime.hours, '時間'],
                  [remainingTime.minutes, '分'],
                  [remainingTime.seconds, '秒'],
                ].map(([value, unit]) => (
                  <div key={unit} className="result-v5-deadline-box">
                    <strong>{value}</strong>
                    <span>{unit}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="result-v5-cta-area" ref={ctaAreaRef}>
              <button
                type="button"
                className="result-v5-cta"
                onClick={handleCtaClick}
                disabled={isCtaNavigating}
                aria-busy={isCtaNavigating}
              >
                {isCtaNavigating
                  ? 'ページを開いています…'
                  : `${ctaLabel} →`}
              </button>

              <p className="result-v5-offer-note">
                ※詳しい内容は、次のページでご確認いただけます
                <br />
                ※この診断結果は、診断完了から24時間ご覧いただけます
              </p>
            </div>
          </section>

          {previewEnabled && (
            <PreviewPanel handleResetDiagnosis={handleResetDiagnosis} />
          )}
        </div>

        <div className="result-v5-footer">
          <Footer />
        </div>
      </main>
    </div>
  )
}
