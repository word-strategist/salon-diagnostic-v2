// src/pages/TopPageB2.jsx

import { useEffect } from 'react'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './TopPageB2.css'

function TopPageB2({ onStart }) {
  useEffect(() => {
    sendTrackingEvent({
      event_type: 'page_view',
      session_id: getSessionId(),
      page: 'top_b2',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
  }, [])

  const handleStart = () => {
    sendTrackingEvent({
      event_type: 'start_click',
      session_id: getSessionId(),
      page: 'top_b2_first_view',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    onStart()
  }

  return (
    <div className="top-b2-page">
      <main className="top-b2-phone">
        <section className="top-b2-hero">
          <div className="top-b2-status">9:41</div>

          <div className="top-b2-hero-inner">
            <div className="top-b2-copy">
              <p>サロン集客、</p>
              <p>頑張っているのに</p>
              <p>うまくつながらない…</p>
            </div>

            <p className="top-b2-subcopy">
              一人で抱え込んでいませんか？
            </p>

            <button type="button" className="top-b2-cta" onClick={handleStart}>
              診断をはじめる
              <span>›</span>
            </button>

            <p className="top-b2-note">無料・登録不要・3分で完了</p>
          </div>

            <div className="top-b2-next-preview">
            <p>こんなお悩み、ありませんか？</p>
            <span>↓</span>
            </div>

        </section>

        <section className="top-b2-block">
          <h2>こんなお悩み、ありませんか？</h2>

          <div className="top-b2-channel-grid">
            <div className="top-b2-channel-card">
              <div className="top-b2-icon">◎</div>
              <p>SNS</p>
              <span>発信が続かない</span>
            </div>

            <div className="top-b2-channel-card">
              <div className="top-b2-icon">□</div>
              <p>HPB</p>
              <span>反応が少ない</span>
            </div>

            <div className="top-b2-channel-card">
              <div className="top-b2-icon">◇</div>
              <p>LINE</p>
              <span>閲覧・反応が薄い</span>
            </div>

            <div className="top-b2-channel-card">
              <div className="top-b2-icon">♧</div>
              <p>紹介</p>
              <span>増えない</span>
            </div>
          </div>

          <p className="top-b2-message">
            いろいろ試しているからこそ、
            <br />
            何から整えるべきか分かりにくくなります。
          </p>
        </section>

        <section className="top-b2-block top-b2-diagnosis">
          <h2>この診断で分かること</h2>

          <div className="top-b2-diagnosis-box">
            <div className="top-b2-list-icon">✓</div>

            <ul>
              <li>あなたの集客タイプ</li>
              <li>今の強み・弱み</li>
              <li>優先すべき集客ポイント</li>
            </ul>
          </div>
        </section>

        <section className="top-b2-block top-b2-merit">
          <h2>診断後は、次の一歩が明確になります</h2>

          <div className="top-b2-merit-grid">
            <div className="top-b2-merit-card">
              <span>○</span>
              <p>やるべきことが<br />スッキリ整理</p>
            </div>

            <div className="top-b2-merit-card">
              <span>◇</span>
              <p>自分に合う方法が<br />見つかる</p>
            </div>

            <div className="top-b2-merit-card">
              <span>✓</span>
              <p>ムリなく成果に<br />つながる行動がわかる</p>
            </div>
          </div>
        </section>

        <section className="top-b2-bottom-cta">
          <p>
            まずは、今の状態を
            <br />
            一緒に見てみましょう。
          </p>

          <button type="button" className="top-b2-cta" onClick={handleStart}>
            診断をはじめる
            <span>›</span>
          </button>

          <p className="top-b2-note">無料・登録不要・3分で完了</p>
        </section>
      </main>
    </div>
  )
}

export default TopPageB2