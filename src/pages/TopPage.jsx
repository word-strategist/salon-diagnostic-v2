import React from 'react'
import Timer from '../components/Timer'
import { CAMPAIGN_END_AT } from '../utils/campaign'

export default function TopPage({ onStart }) {
  return (
<div className="page">
  <section className="mock-section">
    <div className="phone-card top-card">
      <Timer
        mode="fixed"
        targetDate={CAMPAIGN_END_AT}
        title="この診断の終了まで"
        subtitle="終了後、この診断は受けられません"
        expiredText="終了しました"
      />

      <div className="top-banner">
        <img src="/images/banner-top.png" alt="サロン診断のイメージ" />
      </div>

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

          <div
            style={{
              background: '#fff',
              border: '1px solid #eadede',
              borderRadius: '18px',
              padding: '16px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#b88382',
                fontWeight: 800,
                lineHeight: 1.8,
              }}
            >
              ※この診断は一度きりです
            </p>
          </div>

          <button type="button" className="cta-button" onClick={onStart}>
            【無料】30秒で診断する
          </button>

          <p className="note-text">※完全無料・登録不要</p>

          <div className="bottom-stars">✦ ✦ ✦</div>

          <div
            style={{
              marginTop: '16px',
              textAlign: 'center',
              fontSize: '12px',
              lineHeight: 1.8,
            }}
          >
            <a href="/law.html" style={{ color: '#9f8e8e' }}>
              特定商取引法に基づく表記
            </a>
            <span style={{ color: '#c8b8b8', margin: '0 8px' }}>|</span>
            <a href="/privacy.html" style={{ color: '#9f8e8e' }}>
              プライバシーポリシー
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}