import React from 'react'

export default function TopPage({ onStart }) {
  return (
    <div className="page">
      <section className="mock-section">
        <div className="phone-card top-card">
          <div className="icon-circle">✦</div>

          <h1 className="hero-title">
            ホットペッパーに依存しながら、<br />
            集客に不安を抱えてる<br />
            月商50万以下のサロンの方へ
          </h1>

          <div className="mini-line"></div>

          <div className="hero-copy">
            <p>毎月の掲載費を払っているのに、</p>
            <p>思うように予約が増えない。</p>

            <p>頑張っているのに、</p>
            <p>このままでいいのかと感じていませんか？</p>

            <p>この診断では、</p>
            <p>あなたの今の集客状態を整理しながら、</p>
            <p>次に見直すべきポイントが分かります。</p>
          </div>

          <button type="button" className="cta-button" onClick={onStart}>
            【無料】30秒で診断する
          </button>

          <p className="note-text">※完全無料・登録不要</p>

          <div className="bottom-stars">✦ ✦ ✦</div>
        </div>
      </section>
    </div>
  )
}