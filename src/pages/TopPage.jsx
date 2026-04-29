import React from 'react'
import Timer from '../components/Timer'
import { CAMPAIGN_END_AT } from '../utils/campaign'

const COPY = {
  TITLE: [
  'ホットペッパーに依存しながら',
  '集客に不安を抱えている',
  '月商50万以下のサロンの方へ',
  ],

  BODY: [
    '毎月の掲載費を払い続けているのに、',
    '予約の方は思ったようには増えない。',

    '',

    '「やめたら誰も来なくなる」と思うと、',
    'ホットペッパーを手放せないでいる。',

    '',

    '毎日頑張っているはずなのに、',
    '「本当にこのままでいいの…？」と',
    '不安になることはありませんか？',

    '',

    'それ、わかれば対処できます。',
  ],

  VALUE: [
    'この診断では、',
    'あなたのサロンが今どんな状態にあるのかを整理しながら、',

    '',

    'ホットペッパーに頼らずに集客していくために、',
    '今どこから見直すべきかがわかります。',
  ],

  CTA: '【無料】30秒で状態をチェック',

  NOTE: [
    '※完全無料・登録不要',
    '※この診断は一度きりです',
  ],
}

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
            {COPY.TITLE.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>

          <div className="mini-line"></div> 

          <div className="hero-copy">
            {COPY.BODY.map((line, i) =>
              line ? <p key={i}>{line}</p> : <br key={i} />
            )}
          </div>

          <button
            type="button"
            className="cta-button"
            onClick={onStart}
          >
            {COPY.CTA}
          </button>

          <p className="note-text">
            {COPY.NOTE.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < COPY.NOTE.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>

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