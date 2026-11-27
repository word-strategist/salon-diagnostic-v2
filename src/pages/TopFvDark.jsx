import './TopFvDark.css'

/* =========================
   第5回TOP 黒系FV
   layout 'a' / 'b'：第5回TOPの比較案（採用は 'b'）
   2026/11/27：期間制限の廃止に伴い、FV上部のカウントダウンタイマーを撤去
========================= */

const TOP_IMAGE =
  '/images/top/TOP人物_B2_v1_2026-07-04.png'

const BADGES = ['10問', '約1分', '無料', '登録不要']

export default function TopFvDark({ layout = 'a', onStart, onScroll }) {
  return (
    <section className={`top-fv-dark top-fv-dark--${layout}`}>
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
