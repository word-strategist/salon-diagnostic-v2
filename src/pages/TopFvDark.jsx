import { useState } from 'react'
import Timer from '../components/Timer'
import { CAMPAIGN_END_AT } from '../utils/campaign'
import './TopFvDark.css'

/* =========================
   第5回TOP 黒系FV
   layout 'a'：タイマー横長コンパクト
   layout 'b'：タイマー3段構成の小型化
========================= */

const TOP_IMAGE =
  '/images/top/TOP人物_B2_v1_2026-07-04.png'

const BADGES = ['10問', '約1分', '無料', '登録不要']

/* =========================
   ローカル確認用の仮終了日時
   開発サーバーかつ preview=1 のときだけ使用。
   本番ビルドでは常に CAMPAIGN_END_AT を使う。
========================= */

const DEV_PREVIEW_REMAINING_MS =
  ((2 * 24 + 12) * 60 * 60 + 34 * 60 + 56) * 1000

function isDevPreview() {
  if (!import.meta.env.DEV) return false

  const hash = window.location.hash || ''
  const hashQuery = hash.includes('?') ? hash.split('?')[1] : ''

  return (
    new URLSearchParams(window.location.search).get('preview') === '1' ||
    new URLSearchParams(hashQuery).get('preview') === '1'
  )
}

export default function TopFvDark({ layout = 'a', onStart, onScroll }) {
  const [devPreview] = useState(isDevPreview)
  const [timerTarget] = useState(() =>
    devPreview
      ? new Date(Date.now() + DEV_PREVIEW_REMAINING_MS).toISOString()
      : CAMPAIGN_END_AT
  )

  return (
    <section className={`top-fv-dark top-fv-dark--${layout}`}>
      <div className="top-fv-dark-timer">
        <Timer
          mode="fixed"
          layout={layout === 'a' ? 'row' : 'stack'}
          targetDate={timerTarget}
          title="無料診断の受付終了まで"
          subtitle="期間限定で無料公開中"
          expiredText="終了しました"
        />

        {devPreview && (
          <p className="top-fv-dark-dev-note">
            ※確認用の仮の終了日時で表示しています
          </p>
        )}
      </div>

      <div className="top-fv-dark-body">
        <span className="top-fv-dark-rule" aria-hidden="true" />

        <h1 className="top-fv-dark-title">
          なぜ、あなたのサロンは
          <br />
          「選ばれない」のか？
        </h1>

        <p className="top-fv-dark-lead">
          10問で、集客がうまくつながらない原因と
          <br />
          今、優先して見直すポイントがわかります。
        </p>

        <div className="top-fv-dark-stage">
          <ul className="top-fv-dark-badges">
            {BADGES.map((badge) => (
              <li key={badge}>
                <span aria-hidden="true">✓</span>
                {badge}
              </li>
            ))}
          </ul>

          <div className="top-fv-dark-photo" aria-hidden="true">
            <img src={TOP_IMAGE} alt="" loading="eager" />
          </div>
        </div>

        <button
          type="button"
          className="top-fv-dark-cta"
          onClick={onStart}
        >
          <span aria-hidden="true">▶</span>
          <span>今すぐ無料で診断する</span>
        </button>

        {/* 採用TOP（layout 'b'）では下層冒頭の同じ見出しと重複するため表示しない */}
        {layout !== 'b' && (
          <button
            type="button"
            className="top-fv-dark-next"
            onClick={onScroll}
          >
            <span>こんなお悩み、ありませんか？</span>
            <span aria-hidden="true">﹀</span>
          </button>
        )}
      </div>
    </section>
  )
}
