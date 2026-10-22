import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import { getResultRemainingMs } from '../utils/campaign'
import { PATTERN_COPY_IS_DRAFT } from '../data/patternCopy'
import './ResultPageV5View.css'

/* =========================
   第5回 結果ページ（正式仕様 v02・01〜06共通）
   ①診断結果 ②なぜこの結果なのか ③今必要なこと ④あなたに合った進め方 ⑤CTA
   05・06のみ試作：①の後に写真枠、②の末尾に図解（resultVisuals.js）
   ＋ システムUIとしての閲覧期限（診断完了から24時間）
   見た目は承認済み第2案の配色・部品を流用。結果ページに商品名は表示しない。
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
   テキスト表示：「\n\n」で段落、「\n」で改行
========================= */

function splitParagraphs(text) {
  return (text ?? '').split('\n\n').filter(Boolean)
}

function renderLines(paragraph) {
  const lines = paragraph.split('\n')

  return lines.map((line, index) => (
    <span key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ))
}

function Paragraphs({ text, className, emphasis = null }) {
  return splitParagraphs(text).map((paragraph, index) => (
    <p
      key={index}
      className={paragraph === emphasis ? 'r5-em' : className}
    >
      {renderLines(paragraph)}
    </p>
  ))
}

/* =========================
   写真枠・図解（05・06の試作）
   写真は装飾扱い（原因の説明には使わない）。src が無い間は仮の枠
========================= */

function ResultPhoto({ photo }) {
  return (
    <div className="r5-photo">
      {photo.src ? (
        <img src={photo.src} alt="" decoding="async" />
      ) : (
        <span className="r5-photo-placeholder">写真（仮）</span>
      )}
    </div>
  )
}

// flow：順に進む流れ（矢印でつなぐ）／aspects：同等に並ぶ観点
function ResultDiagram({ diagram }) {
  const List = diagram.kind === 'flow' ? 'ol' : 'ul'

  return (
    <List className={`r5-diagram r5-diagram--${diagram.kind}`}>
      {diagram.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
  )
}

/* =========================
   開発確認用：01〜06の代表回答とQ10①〜④切替
   パラメータは # より前に置き、ページを確実に読み込み直す
========================= */

const PREVIEW_EXAMPLES = [
  { label: '01', answers: '0,0,2,0,0,2,0,0,0,0' },
  { label: '02', answers: '2,4,1,1,1,0,0,1,1,1' },
  { label: '03', answers: '1,2,0,0,1,0,0,1,1,2' },
  { label: '04 Q4=1', answers: '1,2,2,1,0,1,0,0,0,0' },
  { label: '04 Q4=2', answers: '1,1,2,2,0,1,0,0,0,3' },
  { label: '05', answers: '1,2,0,0,1,2,0,1,1,0' },
  { label: '06', answers: '2,4,2,0,2,2,0,2,2,3' },
]

function openPreview(answers) {
  const variant =
    sessionStorage.getItem('salon_entry_variant') || 'b5b'
  const search = `?variant=${variant}&preview=1&answers=${answers}`

  if (window.location.search === search) {
    // 同じ回答の場合は # 以降だけの変更になるため、明示的に読み込み直す
    window.location.hash = '#/'
    window.location.reload()
    return
  }

  window.location.href = `${window.location.origin}/${search}#/`
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

      <p className="result-v5-preview-label">結果の切り替え</p>
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
            {['①', '②', '③', '④'].map((label, q10) => (
              <button
                key={label}
                type="button"
                onClick={() =>
                  openPreview(
                    [...currentAnswers.slice(0, 9), q10].join(',')
                  )
                }
              >
                Q10{label}
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
  ctaLabel,
  ctaAreaRef,
  handleCtaClick,
  isCtaNavigating,
  handleResetDiagnosis,
  resultExpiresAt,
  variant,
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

  const [resultLead, ...resultMain] = splitParagraphs(content.result)
  const { bridge, visual } = content

  return (
    // b5b のときだけ入口クラスを付ける（b5b限定の表示調整用。b2 のDOMは変えない）
    <div
      className={`result-v5-page${variant === 'b5b' ? ' result-v5-page--b5b' : ''}`}
    >
      <main className="result-v5-phone">
        {previewEnabled && PATTERN_COPY_IS_DRAFT && (
          <p className="result-v5-draft-badge">
            仮文言：結果文言・案内文は確認用です
          </p>
        )}

        <div className="r5">
          {/* ① 診断結果 */}
          <section className="r5-fv">
            <div className="r5-fv-top">
              <p className="r5-kicker">あなたの診断結果</p>
              <p className="r5-result-no">
                RESULT <strong>{content.pattern}</strong>
              </p>
            </div>

            <p className="r5-result-lead">{renderLines(resultLead)}</p>
            <h1 className="r5-result-main">
              {resultMain.map((paragraph, index) => (
                <span key={index} className="r5-result-block">
                  {renderLines(paragraph)}
                </span>
              ))}
            </h1>
          </section>

          {visual?.photo && <ResultPhoto photo={visual.photo} />}

          {/* ② なぜこの結果なのか */}
          <section className="r5-why">
            <h2 className="r5-subheading">
              {content.whyHeading ?? 'なぜこの結果なのか'}
            </h2>
            <div className="r5-why-body">
              <Paragraphs text={content.why} emphasis={visual?.emphasis} />
            </div>

            {visual?.diagram && <ResultDiagram diagram={visual.diagram} />}
          </section>

          {/* ③ 今必要なこと */}
          <section className="r5-need">
            <h2 className="r5-need-label">今必要なこと</h2>
            <p className="r5-need-text">{renderLines(content.need)}</p>
          </section>

          {/* ④ あなたに合った進め方 */}
          <section className="r5-path">
            <h2 className="r5-path-heading">
              {bridge?.pathHeading ?? 'では、どう改善していくか。'}
            </h2>

            <p className="r5-path-choice">
              {renderLines(bridge?.choiceBefore ?? 'あなたが選んだのは、')}
              <strong>
                {bridge?.choiceQuote
                  ? renderLines(bridge.choiceQuote)
                  : `「${content.wishText}」`}
              </strong>
              {renderLines(bridge?.choiceAfter ?? 'でした。')}
            </p>

            {bridge && (
              <div className="r5-path-bridge">
                {bridge.heading && (
                  <p className="r5-path-bridge-heading">{bridge.heading}</p>
                )}
                <Paragraphs text={bridge.body} className="r5-path-bridge-body" />
              </div>
            )}
          </section>

          {/* システムUI：診断結果の閲覧期限 → ⑤ CTA */}
          <section className="r5-action">
            <p className="r5-timer" aria-label="診断結果の閲覧期限">
              この診断結果は、あと
              <strong>
                {remainingTime.hours}:{remainingTime.minutes}:
                {remainingTime.seconds}
              </strong>
              <span className="result-v5-phrase">ご覧いただけます。</span>
            </p>

            <div className="result-v5-cta-area" ref={ctaAreaRef}>
              <button
                type="button"
                className="result-v5-cta r5-cta"
                onClick={handleCtaClick}
                disabled={isCtaNavigating}
                aria-busy={isCtaNavigating}
              >
                <span>
                  {isCtaNavigating ? 'ページを開いています…' : ctaLabel}
                </span>
                {!isCtaNavigating && <span aria-hidden="true">›</span>}
              </button>

              <p className="r5-cta-note">
                ※詳しい内容は、次のページでご確認いただけます
              </p>
            </div>
          </section>
        </div>

        {previewEnabled && (
          <PreviewPanel handleResetDiagnosis={handleResetDiagnosis} />
        )}

        <div className="result-v5-footer">
          <Footer />
        </div>
      </main>
    </div>
  )
}
